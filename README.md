# Deploy NODEJS na AWS!

```sh
$ aws configure
$ ID da chave de acesso: xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$ Chave de acesso secreta: xxxxxxxxxxxxxxxxxxxxxxxxxxx
$ us-east-1
$ json
```

Criando o servido na AWS
```sh
$ sudo docker-machine create --driver amazonec2 aws02
```
  Running pre-create checks...
  Creating machine...
  (aws02) Launching instance...
  Waiting for machine to be running, this may take a few minutes...
  Detecting operating system of created instance...
  Waiting for SSH to be available...
  Detecting the provisioner...
  Provisioning with ubuntu(systemd)...
  Installing Docker...
  Copying certs to the local machine directory...
  Copying certs to the remote machine...
  Setting Docker configuration on the remote daemon...
  Checking connection to Docker...
  Docker is up and running!
  To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env aws02

```sh
$ sudo docker-machine ls
$ sudo docker-machine env aws02
```                                                   

  export DOCKER_TLS_VERIFY="1"
  export DOCKER_HOST="tcp://xxxxxxx"
  export DOCKER_CERT_PATH="/home/xxxxxx/.docker/machine/machines/aws02"
  export DOCKER_MACHINE_NAME="aws02"
 
```sh
$ eval $(docker-machine env aws02)
```
 Ao acessa a máquina na aws se de erro de permissão: 
 
```sh
$ sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
$ sudo chmod g+rwx "/home/$USER/.docker" -R
$ docker-machine ls 
$ docker -v 
```
  


criando a imagem
```sh
$ docker-compose -f docker-compose.yml -f docker-production.yml up -d
```
Creating network "nodejsdeployaws_default" with the default driver
Pulling reverse-proxy (traefik:)...
latest: Pulling from library/traefik
d572f7c8e983: Pull complete
e7049637f2a9: Pull complete
Digest: sha256:d590b5ef1278809b8809025eba2bd67afc2fdfe1926d87e67fcada14deb38652
Status: Downloaded newer image for traefik:latest
Building app
Step 1/7 : FROM node:10-alpine
10-alpine: Pulling from library/node
e7c96db7181b: Pull complete
df9eac31dfef: Pull complete
0a20433d95a4: Pull complete
Digest: sha256:101042fddccda3a5ae5fbd6752fa568c663e9dc18cec7f7e7b8300c88480fcbe
Status: Downloaded newer image for node:10-alpine
 ---> 56bc3a1ed035
Step 2/7 : WORKDIR /usr/app
 ---> Running in 6692f555bc51
Removing intermediate container 6692f555bc51
 ---> cb5c1d5b73bd
Step 3/7 : COPY package.json yarn.lock ./
 ---> 54a2023b5040
Step 4/7 : RUN yarn
 ---> Running in 0601638dc701
yarn install v1.13.0
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 1.26s.
Removing intermediate container 0601638dc701
 ---> 4529ff7a7be9
Step 5/7 : COPY . .
 ---> 652ccf090619
Step 6/7 : EXPOSE 3000
 ---> Running in 13897856c521
Removing intermediate container 13897856c521
 ---> b98ff0d12d23
Step 7/7 : CMD ["yarn", "start"]
 ---> Running in 7cacc124d436
Removing intermediate container 7cacc124d436
 ---> 8edb464ee294

Successfully built 8edb464ee294
Successfully tagged nodejsdeployaws_app:latest
WARNING: Image for service app was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating nodejsdeployaws_reverse-proxy_1 ... done
Creating nodejsdeployaws_app_1           ... done













