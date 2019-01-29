import { Editor } from 'slate-react';
import { Value } from 'slate';
import { withStyles } from '@material-ui/core/styles';

import React from 'react';
import initialValue from './value.json';
import { isKeyHotkey } from 'is-hotkey';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
//import { Button, Toolbar } from '../components';

const styles = {
  editor: {
    marginBottom: 10
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    //justify: 'center',
    //alignItems: 'flex-start',
    //textAlign: 'right'
  }
};

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+/');
const isLinkHotkey = isKeyHotkey('mod+l');

const existingValue = JSON.parse(localStorage.getItem('text'));

function wrapLink(editor, href) {
  editor.wrapInline({
    type: 'link',
    data: { href }
  });

  editor.moveToEnd();
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

function unwrapLink(editor) {
  editor.unwrapInline('link');
}

class Comprehend extends React.Component {
  state = {
    value: Value.fromJSON(initialValue),
    isEditable: false
  };

  componentDidMount() {
    // if (existingValue) this.setState({ value: existingValue });
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
  };

  ref = editor => {
    this.editor = editor;
  };

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent>
          <Toolbar>
            {this.renderMarkButton('bold', 'format_bold')}
            {this.renderMarkButton('italic', 'format_italic')}
            {this.renderMarkButton('underlined', 'format_underlined')}
            {this.renderMarkButton('code', 'code')}
            {this.renderBlockButton('heading-one', 'looks_one')}
            {this.renderBlockButton('heading-two', 'looks_two')}
            {this.renderBlockButton('block-quote', 'format_quote')}
            {this.renderBlockButton('numbered-list', 'format_list_numbered')}
            {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
            {this.renderBlockButton('link', 'link')}
            <div className={classes.grow} />
            <Button
              disabled={this.state.isEditable}
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => {
                this.setState({ isEditable: true });
              }}
            >
              Edit
            </Button>
          </Toolbar>
          <Divider className={classes.editor} />
          <Editor
            readOnly={!this.state.isEditable}
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
          />
        </CardContent>
        <Divider />

        <CardActions>
          <Button
            disabled={!this.state.isEditable}
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              this.setState({ isEditable: false });
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }

  renderMarkButton = (type, icon) => {
    //const isActive = this.hasMark(type);

    return (
      <IconButton
        disabled={!this.state.isEditable}
        //active={isActive}
        //size="small"
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </IconButton>
    );
  };

  renderBlockButton = (type, icon) => {
    // let isActive = this.hasBlock(type);

    // if (['numbered-list', 'bulleted-list'].includes(type)) {
    //   const {
    //     value: { document, blocks }
    //   } = this.state;

    //   if (blocks.size > 0) {
    //     const parent = document.getParent(blocks.first().key);
    //     isActive = this.hasBlock('list-item') && parent && parent.type === type;
    //   }
    // }

    return (
      <IconButton
        // active={isActive}
        disabled={!this.state.isEditable}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </IconButton>
    );
  };

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  onChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON());
    localStorage.setItem('text', content);
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else if (isLinkHotkey(event)) {
      mark = 'link';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type == 'link');
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    if (type === 'link') {
      event.preventDefault();

      const { editor } = this;
      const { value } = editor;
      const hasLinks = this.hasLinks();

      if (hasLinks) {
        editor.command(unwrapLink);
      } else if (value.selection.isExpanded) {
        const href = window.prompt('Enter the URL of the link:');

        if (href === null) {
          return;
        }

        editor.command(wrapLink, href);
      } else {
        const href = window.prompt('Enter the URL of the link:');

        if (href === null) {
          return;
        }

        const text = window.prompt('Enter the text for the link:');

        if (text === null) {
          return;
        }

        editor
          .insertText(text)
          .moveFocusBackward(text.length)
          .command(wrapLink, href);
      }
    }

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };
}

export default withStyles(styles)(Comprehend);
