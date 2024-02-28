# Digital Dashboard

Roadmap and documentation: [Notion](https://nusteling-solutions.notion.site/Digital-Dashboard-feac2d9f869d411eba11d698284e844f)

## Raspberry PI Setup

```
curl -fsSL https://raw.githubusercontent.com/nusje2000/digital-dashboard/feature/server-setup/bin/setup-pi.sh > setup.sh 
chmod a+x setup.sh
INSTALLATION_PATH=~/digital-dashboard setup.sh
```

In /boot/config.txt
```
dtparam=i2c_arm=on
dtparam=i2s=on
dtparam=i2c_baudrate=700000
```

> NOTE: If you cange the /boot/config.txt, don't forget to reboot your Raspberry PI
