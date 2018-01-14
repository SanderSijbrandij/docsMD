import React from "react"
import moment from 'moment'
import Helmet from 'react-helmet'

export default ({ data }) => {
  const { frontmatter, html } =  data.markdownRemark
  const updated = moment(frontmatter.date).startOf('day')
  const now = moment().startOf('day')
  const lastUpdated = updated.calendar(now, {
    sameDay: 'DD-MM-YYYY',
    lastDay: 'DD-MM-YYYY',
    lastWeek: 'DD-MM-YYYY',
    sameElse: 'DD-MM-YYYY'
  })

  return (
    <div>
      <Helmet title={frontmatter.title} />
      <div>
        <h1 className="title">{frontmatter.title}</h1>
        <h2 className="subtitle is-6">Updated: {lastUpdated}</h2>
        <div
          style={{ 
            borderTop: '1px solid #404040',
            paddingTop: '1.35rem'
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query DocsByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`