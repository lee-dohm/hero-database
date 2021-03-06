import {app, BrowserWindow} from 'electron'

let argv

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  let windowOptions = {
    height: 1000,
    width: 1500,
    webPreferences: {
      defaultEncoding: 'UTF-8',
      experimentalCanvasFeatures: true
    },
    show: false
  }

  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadURL(`file://${__dirname}/../static/index.html`)

  if (argv.dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function main () {
  parseArguments()

  if (argv.version) {
    const metadata = require('../../package.json')

    console.log(`Hero Database: v${metadata.version}`)
    console.log(`     Electron: v${process.versions.electron}`)
    console.log(`         Node: v${process.versions.node}`)

    app.quit()
  }

  createWindow()
}

function parseArguments () {
  argv = require('yargs')
         .usage('Usage: $0 [options]')
         .alias('d', 'dev')
         .alias('debug', 'dev')
         .alias('v', 'version')
         .argv
}

app.on('ready', main)

// Typical applications on macOS will remain running when the last window is closed.
// Since this is intended to be a single-window app, we're opting for exit on last window close
// semantics.
app.on('window-all-closed', () => {
  app.quit()
})
