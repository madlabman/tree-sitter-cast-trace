; extends

; Supports ```cast as info strings
((fenced_code_block
  (info_string
    (language) @language)
  (code_fence_content) @injection.content)
  (#eq? @language "cast")
  (#set! injection.language "cast_trace"))
