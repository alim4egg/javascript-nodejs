# Main host
# For home dev I use in DNS: javascript.in
# For prod it's learn.javascript.ru

server {

  listen 80;
  listen 443 ssl spdy;

  ssl_certificate		<%=certDir%>/learn.javascript.ru/ssl.pem;
  ssl_certificate_key	<%=certDir%>/learn.javascript.ru/ssl.key;
  ssl_trusted_certificate <%=certDir%>/learn.javascript.ru/trusted.pem;
  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains;";

  server_name learn.javascript.ru yuri.javascript.ru javascript.in;

  access_log  /var/log/nginx/learn.javascript.ru.log main;

  root         <%=root%>/public;

  add_header X-Frame-Options SAMEORIGIN;
  add_header X-Content-Type-Options nosniff;

  include "partial/error-pages";

<% if (setPassword) { %>
  auth_basic "Administrator Login";
  auth_basic_user_file /etc/nginx.passwd;
<% } %>

  # ^~ don't check regexps locations if prefix matches
  location ^~ /_download/ {
    internal;
    alias   <%=root%>/download/;
  }

  # restricted download
  location ^~ /download/ {
    include "partial/proxy-3000";
  }


  # zip for plunk
  location ^~ /tutorial/zipview/ {
    include "partial/proxy-3000";
  }


  # payments and dynamically generated invoices
  # no static used (yet)
  location ^~ /payments/ {
    include "partial/proxy-3000";
  }


  # folder/ -> try folder/index.html first, then @node
  location ~ ^(?<uri_no_dot>[^.]*?)/$ {
    try_files $uri_no_dot/index.html @node;
  }

  # no / in url => @node
  location ~ ^[^.]*$ {
    if (-f <%=root%>/service) {
      return 503;
    }
    include "partial/proxy-3000";
  }

  location @node {
    include "partial/proxy-3000";
  }

  # play directory has old plays (big, so moved out of project)
  location ~ ^/play/(.*\.zip)$ {
    alias   /js/play/$1;
  }

  # nodejs-screencast for download (big, so moved out of project)
  location ~ ^/nodejs-screencast/(.*)$ {
    alias   /js/nodejs-screencast/$1;
  }


  include "partial/javascript-static";


}

