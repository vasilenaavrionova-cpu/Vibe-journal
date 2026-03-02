export default {
  envDir: '.',
  server: {
    port: 3002,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        root: 'index.html',
        home: 'src/index.html',
        login: 'src/login.html',
        register: 'src/register.html',
        info: 'src/info.html',
        dashboard: 'src/dashboard.html',
        addEntry: 'src/add-entry.html',
        moodQuest: 'src/mood-quest.html',
        vibeLab: 'src/vibe-lab.html',
      },
    },
  },
}
