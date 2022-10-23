FROM node:lts-alpine3.16

ENV HOME=/home/node
ENV APP=${HOME}/app
ENV ZSH_CUSTOM=${HOME}/.oh-my-zsh/custom

RUN apk add --no-cache zsh zsh-vcs git \
    && apk add curl wget --update

WORKDIR ${HOME}

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" \
    && git clone https://github.com/zsh-users/zsh-autosuggestions "${ZSH_CUSTOM}/plugins/zsh-autosuggestions" \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting" \
    && git clone https://github.com/spaceship-prompt/spaceship-prompt.git "${ZSH_CUSTOM}/themes/spaceship-prompt" --depth=1 \
    && ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "${ZSH_CUSTOM}/themes/spaceship.zsh-theme"

COPY .devcontainer/terminal/.zshrc ${HOME}/.zshrc

WORKDIR ${APP}
