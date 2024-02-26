set -e

function progress() {
    printf "\uf14a $1\n"
}

function success() {
    printf "\uea9a $1\n"
}

function install_if_missing() {
    if ! dpkg -s "$1" &> /dev/null;
    then
        progress "Installing $1..."
        sudo apt-get install "$1" -y
        success "$1 has been installed"
    else
        success "$1 is already installed"
    fi
}

if [ -z "$INSTALLATION_PATH" ]; then
    echo "No path provided, please set the INSTALLATION_PATH environment variable."
    exit 1
fi

progress "Setting up project in \"$INSTALLATION_PATH\"..."

install_if_missing "unzip"
install_if_missing "git"

if ! command -v bun &> /dev/null
then
    progress "Installing bun..."
    curl -fsSL https://bun.sh/install | bash
    source ~/.bashrc
    success "bun has been installed"
else
    success "bun is already installed"
fi

if [ -e "$INSTALLATION_PATH" ]; then
    success "project has already been cloned"
else
    git clone git@github.com:nusje2000/digital-dashboard.git "$INSTALLATION_PATH"
fi

success "setup completed!"
