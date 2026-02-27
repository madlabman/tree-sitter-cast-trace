module.exports = grammar({
  name: 'cast_trace',

  extras: _ => [/[ \t\f]+/],

  word: $ => $.identifier,

  rules: {
    source_file: $ => seq(
      repeat(choice($.statement_line, $.blank_line)),
      optional($._statement),
    ),

    newline: _ => /\r?\n/,
    blank_line: $ => $.newline,
    statement_line: $ => seq($._statement, $.newline),

    _statement: $ => choice(
      $.execution_header,
      $.traces_header,
      $.success_line,
      $.gas_used_line,
      $.trace_call_line,
      $.trace_return_line,
      $.emit_event_line,
      $.emit_topic_line,
      $.topic_line,
      $.data_line,
    ),

    execution_header: _ => 'Executing previous transactions from the block.',
    traces_header: _ => 'Traces:',
    success_line: _ => 'Transaction successfully executed.',

    gas_used_line: $ => seq('Gas', 'used:', field('gas_used', $.number)),

    trace_prefix: _ => repeat1(choice('│', '├', '└', '─')),

    trace_call_line: $ => seq(
      optional($.trace_prefix),
      field('gas', $.gas),
      optional(field('target', $.call_target)),
      '::',
      field('function', $.function_name),
      optional($.value_transfer),
      '(',
      optional(field('arguments', $.arguments)),
      ')',
      optional(field('call_type', $.call_type)),
    ),

    trace_return_line: $ => seq(
      optional($.trace_prefix),
      '←',
      field('status', $.status),
      optional(field('value', $._value)),
    ),

    emit_event_line: $ => seq(
      optional($.trace_prefix),
      'emit',
      field('event_name', $.identifier),
      '(',
      optional(field('arguments', $.arguments)),
      ')',
    ),

    emit_topic_line: $ => seq(
      optional($.trace_prefix),
      'emit',
      'topic',
      field('index', $.number),
      ':',
      field('value', $.hex_data),
    ),

    topic_line: $ => seq(
      optional($.trace_prefix),
      'topic',
      field('index', $.number),
      ':',
      field('value', $.hex_data),
    ),

    data_line: $ => seq(
      optional($.trace_prefix),
      'data',
      ':',
      field('value', $.hex_data),
    ),

    gas: $ => seq('[', field('amount', $.number), ']'),

    call_type: $ => seq('[', field('kind', $.call_kind), ']'),

    call_kind: _ => choice('call', 'staticcall', 'delegatecall'),

    status: $ => seq('[', field('kind', $.status_kind), ']'),

    status_kind: _ => choice('Return', 'Stop', 'Revert', 'Panic', 'Error', 'OutOfGas'),

    call_target: $ => choice($.address, $.identifier),

    value_transfer: $ => seq('{', 'value', ':', field('amount', $.number), '}'),

    function_name: _ => /[A-Za-z0-9_]+/,

    arguments: $ => seq($._argument, repeat(seq(',', $._argument))),

    _argument: $ => choice($.named_argument, $.anonymous_argument, $._value),

    named_argument: $ => seq(field('name', $.identifier), ':', field('value', $._value)),
    anonymous_argument: $ => seq(':', field('value', $._value)),

    _value: $ => choice(
      $.annotated_number,
      $.number,
      $.address,
      $.hex_data,
      $.hex_blob,
      $.string,
      $.boolean,
      $.array,
      $.tuple,
      $.identifier,
    ),

    annotated_number: $ => seq(field('value', $.number), field('annotation', $.sci_annotation)),

    sci_annotation: _ => seq('[', /[0-9]+(?:\.[0-9]+)?e[+-]?[0-9]+/, ']'),

    array: $ => seq('[', optional($.arguments), ']'),

    tuple: $ => seq('(', optional($.arguments), ')'),

    address: _ => /0x[0-9A-Fa-f]{40}/,

    hex_data: _ => /0x[0-9A-Fa-f]*/,
    hex_blob: $ => seq(field('head', $.number), field('tail', $.hex_tail)),
    hex_tail: _ => /[A-Fa-f][0-9A-Fa-f]+/,

    number: _ => /[0-9][0-9_]*/,

    string: _ => token(seq('"', /[^"\n]*/, '"')),

    boolean: _ => choice('true', 'false'),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,
  },
});
