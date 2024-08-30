# PM2 Configuration README

This README explains the PM2 configuration for our project and provides information about PM2 and its most useful commands.

## Project Structure

Our project consists of multiple applications:

1. API (Express.js)
2. Control Panel (Express.js)
3. Web Application (Express.js)
4. Landing Page (React with Vite)
5. NestJS Application

## PM2 Configuration

We have two PM2 configuration files:

1. Development mode (`ecosystem.config.js`)
2. Production mode (`ecosystem.prod.js`)

### Development Mode

In development mode, the applications are started with development-specific commands:

```javascript
module.exports = {
  apps: [
    {
      name: 'api.app',
      cwd: 'express-app/api',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'cpanel.app',
      cwd: 'express-app/cpanel',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'web.app',
      cwd: 'express-app/web',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'landing.app',
      cwd: 'react-vite/landing-page',
      script: 'npm',
      args: 'run dev'
    },
    {
      name: 'nestjs.app',
      cwd: 'nestjs-app',
      script: 'npm',
      args: 'run start:dev'
    }
  ],
};
```

### Production Mode

In production mode, the applications are started with production-specific commands:

```javascript
module.exports = {
  apps: [
    {
      name: 'api.app',
      cwd: 'express-app/api',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'cpanel.app',
      cwd: 'express-app/cpanel',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'web.app',
      cwd: 'express-app/web',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'landing.app',
      cwd: 'react-vite/landing-page',
      script: 'npm',
      args: 'run prod'
    },
    {
      name:'nestjs.app',
      cwd: 'nestjs-app',
      script: 'npm',
      args: 'run start:prod'
    }
  ],
};
```

## About PM2

PM2 (Process Manager 2) is a production process manager for Node.js applications. It allows you to keep applications alive forever, reload them without downtime, and facilitate common system admin tasks.

### Key Features of PM2

1. Process Management: Start, stop, and restart applications
2. Load Balancing: Automatically load balance your app across all CPUs
3. Monitoring: Monitor CPU usage, memory usage, and other metrics
4. Log Management: Centralized log management
5. Startup Scripts: Generate and configure startup scripts

## Most Useful PM2 Commands

1. Start an application:
   ```
   pm2 start app.js
   ```

2. Start an application using a configuration file:
   ```
   pm2 start ecosystem.config.js
   ```

3. List all running applications:
   ```
   pm2 list
   ```

4. Stop an application:
   ```
   pm2 stop app_name_or_id
   ```

5. Restart an application:
   ```
   pm2 restart app_name_or_id
   ```

6. Delete an application from PM2:
   ```
   pm2 delete app_name_or_id
   ```

7. Monitor all applications:
   ```
   pm2 monit
   ```

8. View logs for all applications:
   ```
   pm2 logs
   ```

9. View logs for a specific application:
   ```
   pm2 logs app_name_or_id
   ```

10. Reload an application without downtime:
    ```
    pm2 reload app_name_or_id
    ```

11. Start PM2 on system startup:
    ```
    pm2 startup
    ```

12. Save the current PM2 process list:
    ```
    pm2 save
    ```

To use our project-specific configurations, you can use:

- For development:
  ```
  pm2 start ecosystem.config.js
  ```

- For production:
  ```
  pm2 start ecosystem.prod.js
  ```

Remember to install PM2 globally before using these commands:

```
npm install pm2 -g
```

For more detailed information about PM2 and its features, please refer to the [official PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).