# Installation #

Install browserify globally

```
npm install -g browserify
```

Install dependencies

```
npm install
```

Run tests and build JavaScript bundle

```
./run.sh
```


If you use Apache, this is a valid config

```
<VirtualHost *:80>
        ServerName fm

        ServerAdmin dev@baudson.de
        DocumentRoot /home/christoph/projects/fm

        <Directory /home/christoph/projects/fm/>
        	Options Indexes FollowSymLinks
	        AllowOverride All
        	Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Also add the ServerName to /etc/hosts

```
127.0.0.1       localhost fm
```

Access it via

```
http://fm
```
