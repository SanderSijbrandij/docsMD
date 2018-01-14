import React, { Component } from 'react'
import Link from 'gatsby-link'

export default class Treeview extends Component {
  constructor(props) {
    super(props)
    const sortedEdges = props.data.edges
      .sort((a, b) => a.node.frontmatter.path.split('').length > b.node.frontmatter.path.split('').length)
    const tree = this.constructTree(sortedEdges)
    console.log(tree)
    this.state = { tree }
  }

  // constructs a nested object based on path
  constructTree(edges, currentTree = {}) {
    // we're done! booya!
    if (edges.length === 0) { return currentTree }
    
    const tree = Object.assign({}, currentTree)
    const [currentEdge, ...remainingEdges] = edges
    const { title, path } = currentEdge.node.frontmatter
    const splitPath = path.split('/').filter(part => part !== '')
    const [currentRoot, ...branches] = splitPath
    tree[currentRoot] = Object.assign({}, tree[currentRoot])
    
    if (splitPath.length === 1) {
      tree[currentRoot].data = { title, path }
    } else {
      currentEdge.node.frontmatter.path = splitPath.slice(1, splitPath.length).join('/')
      tree[currentRoot] = Object.assign(tree[currentRoot], this.constructTree([currentEdge], tree[currentRoot]))
    }
    return this.constructTree(remainingEdges, tree)
  }

  renderLink(edge) {
    const { title, path } = edge.node.frontmatter

    return <li key={path}><Link to={path}>{title}</Link></li>
  }

  render() {
    const { edges } = this.props.data
    return (
      <div>
        <h3>{edges.length} docs found.</h3>
        <ul>
          {edges.map(this.renderLink)}
        </ul>
      </div>
    )
  }
}