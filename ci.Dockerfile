FROM mcr.microsoft.com/playwright:v1.37.0-jammy

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
# COPY package*.json /app/
# COPY playwright.config*.js /app/
# COPY devops.env /app/.env
# COPY tests/ /app/tests/
# COPY allure-results /app/allure-results

RUN apt-get update && apt-get -y install zip libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install JAVA
RUN apt install -y default-jre
RUN wget -q https://github.com/allure-framework/allure2/releases/download/2.22.4/allure-2.22.4.tgz 
RUN tar -zxvf allure-2.22.4.tgz -C /opt/
RUN ln -s /opt/allure-2.22.4/bin/allure /usr/bin/allure

# Removing folder allure .tgz after installed
RUN rm -R allure-2.22.4.tgz

RUN npm install -g npm@latest 

# RUN npm ci