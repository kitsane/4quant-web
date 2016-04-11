module CustomHelpers
  SUMMARY_START = "SUMMARY_START"
  SUMMARY_END = "SUMMARY_END"

  def navigation_list(navigation, li_class: 'list-inline-item', a_class: '')
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
