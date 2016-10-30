import HeroEnvironment from '../renderer/hero-environment'
import WorkspaceView from '../renderer/workspace-view'

let workspaceView = new WorkspaceView()
window.hero = new HeroEnvironment(workspaceView)

document.body.appendChild(workspaceView.element)
