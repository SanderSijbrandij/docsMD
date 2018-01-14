import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Treeview from '../components/Treeview'

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet title="Documentation">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css" />
    </Helmet>
    <Header />
    <div className="columns">
      <div className="column is-one-fifth container is-fluid">
        <Treeview data={data.allMarkdownRemark}/>
      </div>
      <main className="column container is-fluid">{children()}</main>
    </div>
  </div>
)

export const pageQuery = graphql`
  query DocMeta {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
