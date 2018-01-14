import React, { Component } from 'react'

export default class Treeview extends Component {
  renderLink(edge) {
    const { title, path } = edge.node.frontmatter
    
    return <li key={path}><a href={path}>{title}</a></li>
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