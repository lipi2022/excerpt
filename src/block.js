import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
const Quote = require('@editorjs/quote');
const CodeTool = require('@editorjs/code');
const Checklist = require('@editorjs/checklist');
const Warning = require('@editorjs/warning');
const Marker = require('@editorjs/marker');
const Delimiter = require('@editorjs/delimiter');
const InlineCode = require('@editorjs/inline-code');
const LinkTool = require('@editorjs/link');
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
const apiToken = "YUz82BUGJTjFyXOGY22HxtX9atNwJdo2IasOs9XF"
const file_endpoint = "https://imagecf.excerpt.space"

/**
 * To initialize the Editor, create a new instance with configuration object
 * @see docs/installation.md for mode details
 */
var editor = new EditorJS({
  /**
   * Enable/Disable the read only mode
   */
  readOnly: false,

  /**
   * Wrapper of Editor
   */
  holder: "editorjs",

  /**
   * Common Inline Toolbar settings
   * - if true (or not specified), the order from 'tool' property will be used
   * - if an array of tool names, this order will be used
   */
  // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
  // inlineToolbar: true,

  /**
   * Tools list
   */
  tools: {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
      class: Header,
      inlineToolbar: ["marker", "link"],
      config: {
        placeholder: "Header",
      },
      shortcut: "CMD+SHIFT+H",
    },

    /**
     * Or pass class directly without any configuration
     */
    // image: SimpleImage,
    image: {
      class: ImageTool,
      config: {
        /**
         * Custom uploader
         */
        endpoints: {
          byFile: file_endpoint,
          byUrl: '',
        },
        additinalRequestHeaders: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "x-requested-with,content-type",
          "Access-Control-Allow-Credentials": true

        },
      },
    },

    list: {
      class: List,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+L",
    },

    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },

    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
      shortcut: "CMD+SHIFT+O",
    },

    warning: Warning,

    marker: {
      class: Marker,
      shortcut: "CMD+SHIFT+M",
    },

    code: {
      class: CodeTool,
      shortcut: "CMD+SHIFT+C",
    },

    delimiter: Delimiter,

    inlineCode: {
      class: InlineCode,
      shortcut: "CMD+SHIFT+C",
    },

    linkTool: LinkTool,

    embed: Embed,

    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: "CMD+ALT+T",
    },
  },

  /**
   * This Tool will be used as default
   */
  // defaultBlock: 'paragraph',

  /**
   * Initial Editor data
   */
  data: {
    blocks: [

    ],
  },
  onReady: function () {
    saveButton.click();
  },
  onChange: function (api, event) {
    console.log("something changed", event);
  },
});

/**
 * Saving button
 */
const saveButton = document.getElementById("saveButton");

/**
 * Toggle read-only button
 */
const toggleReadOnlyButton = document.getElementById("toggleReadOnlyButton");
const readOnlyIndicator = document.getElementById("readonly-state");

/**
 * Saving example
 */
saveButton.addEventListener("click", function () {
  editor
    .save()
    .then((savedData) => {
      //   cPreview.show(savedData, document.getElementById("output"));
      console.log("output");
    })
    .catch((error) => {
      console.error("Saving error", error);
    });
});

