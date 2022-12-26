module.exports = {
  apps: [
    {
      name: "realworld-express",
      script: "app.js",
    },
  ],
  deploy: {
    prod: {
      user: "root",
      host: "47.243.206.107",
      ref: "origin/main",
      repo: "git@github.com:liujie2288/node.git",
      path: "/www/wwwroot",
      "post-deploy":
        "git reset --hard && git checkout main && git pull && rm -rf ../realworld-express &&   cp -rf ./Express/Express教程/realworld-express  ../realworld-express && cd ../realworld-express && npm install --omit=dev && pm2 startOrReload ecosystem.config.js",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
