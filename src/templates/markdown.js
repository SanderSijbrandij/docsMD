import React from "react"
import moment from 'moment'

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
      <div>
        <h1>{frontmatter.title}</h1>
        <p>Updated: {lastUpdated}</p>
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