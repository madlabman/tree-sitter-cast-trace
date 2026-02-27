# tree-sitter-cast-trace

Tree-sitter grammar for Foundry `cast` trace output.

This code was written by an LLM.

## Generate parser

```bash
npm install
npm run generate
npm test
```

## Validate against local traces

```bash
npm run parse:sample
npm run parse:all
```

`tree-sitter parse` may warn about parser directories if `tree-sitter init-config` has not been run yet; this does not affect local parsing from this grammar directory.

## Neovim usage (local parser)

Add this parser in your Tree-sitter config, then map your trace files to the `cast_trace` filetype/language.

```lua
require('nvim-treesitter.parsers').get_parser_configs().cast_trace = {
  install_info = {
    url = '/path/to/tree-sitter-cast-trace',
    files = { 'src/parser.c' },
  },
  filetype = 'casttrace',
}
```
