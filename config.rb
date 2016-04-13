###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

activate :blog do |blog|
  blog.permalink = 'news/:year-:month-:day-:title'
  blog.sources = 'news/:year-:month-:day-:title'
  blog.summary_generator = Proc.new  do |resource, rendered, length, ellipsis|
    "#{rendered.split(SUMMARY_START).last.split(SUMMARY_END).first}#{ellipsis}"
  end
end

# Helpers
SUMMARY_START = "SUMMARY_START"
SUMMARY_END = "SUMMARY_END"

helpers do
  def navigation_list(navigation, li_class: 'list-inline-item nav-item', a_class: 'nav-link')
    navigation.map do |label, path|
      content_tag :li, class: li_class do
        link_to label, "/#{path}", class: a_class
      end
    end.join
  end

  def cleanup_summary_start_end_separator(html)
    html.sub(SUMMARY_START, "").sub(SUMMARY_END, "")
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
