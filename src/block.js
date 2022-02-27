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
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file) {
            // your own uploading logic here
            return MyAjax.upload(file).then(() => {
              return {
                success: 1,
                file: {
                  url: "https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg",
                  // any other image data you want to store, such as width, height, color, extension, etc
                },
              };
            });
          },

          /**
           * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
           * @param {string} url - pasted image URL
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByUrl(url) {
            // your ajax request for uploading
            return MyAjax.upload(file).then(() => {
              return {
                success: 1,
                file: {
                  url: "https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg",
                  // any other image data you want to store, such as width, height, color, extension, etc
                },
              };
            });
          },
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
      {
        type: "header",
        data: {
          text: "Editor.js",
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
        },
      },
      {
        type: "header",
        data: {
          text: "Key features",
          level: 3,
        },
      },
      {
        type: "list",
        data: {
          items: [
            "It is a block-styled editor",
            "It returns clean data output in JSON",
            "Designed to be extendable and pluggable with a simple API",
          ],
          style: "unordered",
        },
      },
      {
        type: "header",
        data: {
          text: "What does it mean «block-styled editor»",
          level: 3,
        },
      },
      {
        type: "header",
        data: {
          text: "What does it mean clean data output",
          level: 3,
        },
      },

      {
        type: "paragraph",
        data: {
          text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`,
        },
      },
      {
        type: "delimiter",
        data: {},
      },
      {
        type: "image",
        data: {
          url: "assets/codex2x.png",
          caption: "",
          stretched: false,
          withBorder: true,
          withBackground: false,
        },
      },
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

