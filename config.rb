###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Slides
page '/slides/*', layout: :slides_layout

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  # activate :livereload
end

activate :google_analytics do |ga|
  ga.tracking_id = 'UA-48764461-1'
end

activate :blog do |blog|
  blog.permalink = 'news/:year-:month-:day-:title'
  blog.sources = 'news/:year-:month-:day-:title'
  blog.summary_generator = Proc.new  do |resource, rendered, length, ellipsis|
    "#{rendered.split(SUMMARY_START).last.split(SUMMARY_END).first}#{ellipsis}"
  end
end

activate :external_pipeline do |pipe|
  pipe.name = :gulp
  pipe.command = build? ? './node_modules/gulp/bin/gulp.js' : './node_modules/gulp/bin/gulp.js watch'
  pipe.source = ".tmp/dist"
  pipe.latency = 1
end

activate :syntax, css_class: 'syntax'

activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.build_before = true
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
  activate :favicon_maker do |f|
    f.template_dir  = 'source/images'
    f.icons = {
      "favicon.svg" => [
        { icon: "apple-touch-icon-precomposed.png", size: "152x152" },
        { icon: "favicon.png", size: "152x152" },
        { icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },
        { icon: "mstile-70x70.png", size: "70x70" },
        { icon: "mstile-144x144.png", size: "144x144" },
        { icon: "mstile-150x150.png", size: "150x150" },
        { icon: "mstile-310x310.png", size: "310x310" },
        { icon: "mstile-310x150.png", size: "310x150" }
      ]
    }
  end

  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  activate :relative_assets
  set :relative_links, true
end
