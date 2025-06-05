<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-td-green">TD Bank</h1>
            </div>
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link 
                to="/executive" 
                class="px-3 py-2 rounded-md text-sm font-medium hover:text-td-green"
                :class="{ 'text-td-green border-b-2 border-td-green': $route.name === 'Executive' }"
              >
                Executive Dashboard
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-sm text-gray-600">Client 360 Portfolio Management</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script> 