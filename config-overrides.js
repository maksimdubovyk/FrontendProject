// config-overrides.js
module.exports = function override(config, env) {
    // Якщо ви хочете змінити налаштування devServer, ви можете зробити це тут
    if (config.devServer) {
      config.devServer.overlay = {
        warnings: false,
        errors: true,
      };
    }
  
    return config; // Повертаємо модифіковану конфігурацію
  };
  