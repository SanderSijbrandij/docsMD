import React, { Component } from 'react'
import Link from 'gatsby-link'

export default class Treeview extends Component {
  constructor(props) {
    super(props)
    this.state = { tree: this.constructTree(props.data.edges) }

    this.renderLink = this.renderLink.bind(this)
    this.renderNode = this.renderNode.bind(this)
  }

  // constructs a nested object based on path
  constructTree(edges, currentTree = {}, currentPath = null) {
    if (edges.length === 0) { return currentTree }
    
    const tree = Object.assign({}, currentTree)
    const [currentEdge, ...remainingEdges] = edges
    const { title, path } = currentEdge.node.frontmatter
    const splitPath = path.split('/').filter(part => part !== '')
    const [currentRoot, ...branches] = splitPath

    tree[currentRoot] = Object.assign({}, tree[currentRoot])
    
    if (splitPath.length === 1) {
      tree[currentRoot].__data = { title, path: currentPath ? currentPath : path }
    } else {
      currentEdge.node.frontmatter.path = splitPath.slice(1, splitPath.length).join('/')
      currentPath = currentPath ? currentPath : path
      tree[currentRoot] = Object.assign(tree[currentRoot], this.constructTree([currentEdge], tree[currentRoot], currentPath))
    }
    return this.constructTree(remainingEdges, tree)
  }

  // TODO: refactor & cleanup
  renderNode([ key, value ]) {
    if (key === '__data') {
      return this.renderLink(value)
    } else if (Object.keys(value).length === 1 && value.__data) {
      return this.renderLink(value.__data)
    } else if (value.__data) { 
      // the path itself has both data and children.
      const { title, path } = value.__data
      const newValue = { }
      Object.keys(value).forEach(key => {
        if (key !== '__data') { 
          newValue[key] = value[key]
        }
      })

      return (
        <li key={key}>
          <span className="menu-label"><Link to={path}>{title}</Link></span>
          <ul className="menu-list">
            {Object.entries(newValue).map(this.renderNode)}
          </ul>
        </li>
      )
    } else {
      return (
        <li key={key}>
          <span className="menu-label">{key}</span>
          <ul className="menu-list">
            {Object.entries(value).map(this.renderNode)}
          </ul>
        </li>
      )
    }
  }

  renderLink({ title, path }) {
    return <li key={path}><Link to={path}>{title}</Link></li>
  }

  render() {
    const { docs } = this.state.tree
    console.log(docs)

    return (
      <aside className="menu">
        <ul className="menu-list">
          {Object.entries(docs).map(this.renderNode)}
        </ul>
      </aside>
    )
  }
}