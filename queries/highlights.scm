(execution_header) @comment
(traces_header) @keyword
(success_line) @string
(gas_used_line) @label

(gas amount: (number) @number)
(gas_used_line gas_used: (number) @number)

(call_target (address) @constant)
(call_target (identifier) @type)
(address) @constant
(hex_data) @string.special
(hex_blob head: (number) @string.special)
(hex_blob tail: (hex_tail) @string.special)

(function_name) @function
(call_kind) @keyword.call
(status_kind) @keyword

(value_transfer amount: (number) @number)

(named_argument name: (identifier) @property)
(emit_event_line "emit" @keyword)
(emit_topic_line "emit" @keyword)

(emit_event_line event_name: (identifier) @punctuation.special)

(string) @string
(boolean) @constant.builtin
(annotated_number annotation: (sci_annotation) @number.float)
