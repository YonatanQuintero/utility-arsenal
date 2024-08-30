# Nginx Configuration

This README explains the Nginx configuration for mydomain.localhost and its WebSocket server, how to install Nginx on Debian, and common Nginx commands.

## Table of Contents
1. [Installing Nginx on Debian](#installing-nginx-on-debian)
2. [Common Nginx Commands](#common-nginx-commands)
3. [HTTP Configuration](#http-configuration)
4. [WebSocket Configuration](#websocket-configuration)
5. [Common Settings](#common-settings)
6. [Usage](#usage)

## Installing Nginx on Debian

To install Nginx on a Debian-based system, follow these steps:

1. Update your package list:
   ```
   sudo apt update
   ```

2. Install Nginx:
   ```
   sudo apt install nginx
   ```

3. Start the Nginx service:
   ```
   sudo systemctl start nginx
   ```

4. Enable Nginx to start on boot:
   ```
   sudo systemctl enable nginx
   ```

5. Check the status of Nginx:
   ```
   sudo systemctl status nginx
   ```

6. You can now access the default Nginx page by opening a web browser and navigating to `http://localhost` or your server's IP address.

## Common Nginx Commands

Here are some common commands you'll use when working with Nginx:

1. Start Nginx:
   ```
   sudo systemctl start nginx
   ```

2. Stop Nginx:
   ```
   sudo systemctl stop nginx
   ```

3. Restart Nginx:
   ```
   sudo systemctl restart nginx
   ```

4. Reload Nginx configuration without stopping the server:
   ```
   sudo systemctl reload nginx
   ```

5. Test Nginx configuration for syntax errors:
   ```
   sudo nginx -t
   ```

6. Show Nginx version:
   ```
   nginx -v
   ```

7. Show Nginx version and configuration options:
   ```
   nginx -V
   ```

8. View Nginx error logs:
   ```
   sudo tail -f /var/log/nginx/error.log
   ```

9. View Nginx access logs:
   ```
   sudo tail -f /var/log/nginx/access.log
   ```

10. Edit the main Nginx configuration file:
    ```
    sudo nano /etc/nginx/nginx.conf
    ```

11. Edit the default server block configuration:
    ```
    sudo nano /etc/nginx/sites-available/default
    ```

Remember to reload or restart Nginx after making configuration changes.

## HTTP Configuration

### Upstream Definition
```nginx
upstream mydomain.localhost {   
    server localhost:3000; 
}
```
This defines an upstream server for `mydomain.localhost` that points to `localhost:3000`.

### Server Block
```nginx
server {
    listen 80;
    server_name mydomain.localhost;
    
    location / {
        # Proxy settings (see Common Settings below)
        proxy_pass http://mydomain.localhost;
        proxy_redirect off;
    }
}
```
This server block handles HTTP requests for `mydomain.localhost`:
- Listens on port 80
- Proxies requests to the upstream server defined earlier

## WebSocket Configuration

### Upstream Definition
```nginx
upstream updates.mydomain.localhost {   
   server localhost:3001; 
}
```
This defines an upstream server for `updates.mydomain.localhost` that points to `localhost:3001`.

### Server Block
```nginx
server {
    listen 80;
    server_name updates.mydomain.localhost;
    
    location / {
        # Proxy settings (see Common Settings below)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://updates.mydomain.localhost;
        proxy_redirect off;
    }
}
```
This server block handles WebSocket connections for `updates.mydomain.localhost`:
- Listens on port 80
- Includes additional headers for WebSocket support
- Proxies requests to the WebSocket upstream server

## Common Settings

Both server blocks use the following common proxy settings:

```nginx
proxy_set_header X-Real-IP $remote_addr;     
proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;     
proxy_set_header X-NginX-Proxy true;
```

These headers ensure that the proxied servers receive accurate information about the original client request.

## Usage

1. Replace `mydomain` with your actual domain name throughout the configuration.
2. Ensure that your application is running on `localhost:3000` for HTTP requests.
3. Ensure that your WebSocket server is running on `localhost:3001`.
4. Restart Nginx after making changes to the configuration.

Note: This configuration assumes you're running everything on the same machine. Adjust the upstream server addresses if your services are running on different hosts.