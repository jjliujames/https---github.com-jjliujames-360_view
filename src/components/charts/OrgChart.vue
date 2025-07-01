<template>
    <div class="org-chart-container">
        <div ref="chartContainer" class="w-full h-80 bg-gray-50 rounded-lg relative"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    name: 'OrgChart',
    emits: ['nodeClick'],
    props: {
        orgData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            svg: null,
            tooltip: null
        }
    },
    mounted() {
        this.initChart()
    },
    watch: {
        orgData: {
            handler() {
                this.updateChart()
            },
            deep: true
        }
    },
    methods: {
        initChart() {
            this.createSvg()
            this.createTooltip()
            this.updateChart()
        },

        createSvg() {
            const container = this.$refs.chartContainer
            const containerRect = container.getBoundingClientRect()

            this.svg = d3.select(container)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`)
                .style('background', 'transparent')
        },

        createTooltip() {
            this.tooltip = d3.select(this.$refs.chartContainer)
                .append('div')
                .style('position', 'absolute')
                .style('background', 'rgba(0, 0, 0, 0.9)')
                .style('color', 'white')
                .style('padding', '8px 12px')
                .style('border-radius', '6px')
                .style('font-size', '12px')
                .style('pointer-events', 'none')
                .style('opacity', 0)
                .style('z-index', 1000)
        },

        updateChart() {
            if (!this.svg) return

            this.svg.selectAll('*').remove()

            const containerRect = this.$refs.chartContainer.getBoundingClientRect()
            const width = containerRect.width
            const height = containerRect.height

            // Create hierarchy from data
            const root = d3.hierarchy(this.orgData)

            // Create tree layout
            const treeLayout = d3.tree()
                .size([width - 40, height - 100])
                .separation((a, b) => (a.parent === b.parent ? 1 : 1.2))

            // Apply layout
            const treeData = treeLayout(root)

            // Create main group and center it
            const g = this.svg.append('g')
                .attr('transform', `translate(20, 50)`)

            // Draw links
            const links = g.selectAll('.link')
                .data(treeData.links())
                .enter()
                .append('path')
                .attr('class', 'link')
                .attr('d', d3.linkVertical()
                    .x(d => d.x)
                    .y(d => d.y)
                )
                .style('fill', 'none')
                .style('stroke', '#6b7280')
                .style('stroke-width', 2)
                .style('stroke-opacity', 0.6)

            // Create nodes group
            const nodes = g.selectAll('.node')
                .data(treeData.descendants())
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', d => `translate(${d.x}, ${d.y})`)

            // Add rectangles for nodes
            nodes.append('rect')
                .attr('x', d => -this.getNodeWidth(d) / 2)
                .attr('y', -20)
                .attr('width', d => this.getNodeWidth(d))
                .attr('height', 40)
                .attr('rx', 8)
                .style('fill', d => this.getNodeColor(d))
                .style('stroke', d => this.getNodeStrokeColor(d))
                .style('stroke-width', 2)
                .style('cursor', d => d.data.clickable ? 'pointer' : 'default')
                .style('transition', 'all 0.3s ease')
                .on('mouseover', (event, d) => {
                    if (d.data.clickable) {
                        d3.select(event.target)
                            .style('opacity', 0.8)
                            .style('transform', 'scale(1.05)')
                    }
                    this.showTooltip(event, d)
                })
                .on('mouseout', (event, d) => {
                    d3.select(event.target)
                        .style('opacity', 1)
                        .style('transform', 'scale(1)')
                    this.hideTooltip()
                })
                .on('click', (event, d) => {
                    if (d.data.clickable) {
                        this.$emit('nodeClick', d.data.id)
                    }
                })

            // Add text labels
            nodes.append('text')
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .style('fill', 'white')
                .style('font-size', d => d.depth === 0 ? '14px' : '12px')
                .style('font-weight', 'bold')
                .style('pointer-events', 'none')
                .text(d => d.data.name)
                .call(this.wrapText, d => this.getNodeWidth(d) - 16)

            // Add revenue/asset information
            nodes.filter(d => d.data.revenue || d.data.assets)
                .append('text')
                .attr('dy', '1.5em')
                .attr('text-anchor', 'middle')
                .style('fill', 'white')
                .style('font-size', '10px')
                .style('font-weight', 'normal')
                .style('pointer-events', 'none')
                .text(d => d.data.revenue || d.data.assets)

            // Add click indicator for clickable nodes
            nodes.filter(d => d.data.clickable)
                .append('circle')
                .attr('cx', d => this.getNodeWidth(d) / 2 - 8)
                .attr('cy', -12)
                .attr('r', 6)
                .style('fill', 'rgba(255, 255, 255, 0.3)')
                .style('stroke', 'white')
                .style('stroke-width', 1)
                .style('pointer-events', 'none')

            nodes.filter(d => d.data.clickable)
                .append('text')
                .attr('x', d => this.getNodeWidth(d) / 2 - 8)
                .attr('y', -12)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .style('fill', 'white')
                .style('font-size', '10px')
                .style('font-weight', 'bold')
                .style('pointer-events', 'none')
                .text('→')
        },

        getNodeWidth(d) {
            if (d.depth === 0) return 200 // Parent company
            return 180 // Subsidiaries
        },

        getNodeColor(d) {
            if (d.depth === 0) return '#1e40af' // Blue for parent
            return '#059669' // Green for subsidiaries
        },

        getNodeStrokeColor(d) {
            if (d.depth === 0) return '#1e3a8a'
            return '#047857'
        },

        wrapText(text, width) {
            text.each(function (d) {
                const textElement = d3.select(this)
                const words = d.data.name.split(/\s+/).reverse()
                let word
                let line = []
                let lineNumber = 0
                const lineHeight = 1.1
                const y = textElement.attr('y') || 0
                const dy = parseFloat(textElement.attr('dy') || 0)
                let tspan = textElement.text(null)
                    .append('tspan')
                    .attr('x', 0)
                    .attr('y', y)
                    .attr('dy', dy + 'em')

                while (word = words.pop()) {
                    line.push(word)
                    tspan.text(line.join(' '))
                    if (tspan.node().getComputedTextLength() > width(d)) {
                        line.pop()
                        tspan.text(line.join(' '))
                        line = [word]
                        tspan = textElement.append('tspan')
                            .attr('x', 0)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word)
                    }
                }
            })
        },

        showTooltip(event, d) {
            if (!d.data.tooltip) return

            this.tooltip
                .style('opacity', 0.9)
                .html(d.data.tooltip)
                .style('left', (event.offsetX + 10) + 'px')
                .style('top', (event.offsetY - 40) + 'px')
        },

        hideTooltip() {
            this.tooltip.style('opacity', 0)
        }
    },

    beforeUnmount() {
        if (this.svg) {
            this.svg.remove()
        }
        if (this.tooltip) {
            this.tooltip.remove()
        }
    }
}
</script>

<style scoped>
.org-chart-container {
    width: 100%;
    min-height: 320px;
}

/* D3 specific styles */
:deep(.node rect) {
    transition: all 0.3s ease;
}

:deep(.node:hover rect) {
    filter: brightness(1.1);
}

:deep(.link) {
    transition: stroke-opacity 0.3s ease;
}
</style>