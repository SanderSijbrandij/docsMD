import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Treeview from '../components/Treeview'
import './index.css'

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet
      title="Documentation"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1280,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Treeview data={data.allMarkdownRemark}/>
      <main style={{ marginLeft: 20, flex: 1 }}>{children()}</main>
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
