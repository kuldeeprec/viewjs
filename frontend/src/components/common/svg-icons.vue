<template>
  <svg :class="dimensions" :fill="fillColor" :stroke="color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="path" />
  </svg>
</template>
<script>
export default {
  name: 'SVGIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 6,
      required: false,
    },
    width: {
      type: Number,
      default: 6,
      required: false,
    },
    color: {
      type: String,
      default: '#BFBFBF',
      required: false,
    },
    fillColor: {
      type: String,
      default: 'none',
      required: false,
    },
  },
  data() {
    return {
      path: '',
      dimensions: '',
    };
  },
  mounted() {
    this.selectIcon();
    this.dimensionClasses();
  },
  methods: {
    dimensionClasses() {
      let height = 'h-6';
      let width = 'w-6';
      if (this.height) {
        height = `h-${this.height}`;
      }
      if (this.width) {
        width = `w-${this.width}`;
      }
      this.dimensions = [height, width].join(' ');
    },
    selectIcon() {
      switch (this.name) {
        case 'user':
          this.path = 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z';
          break;
        case 'users':
          this.path = 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z';
          break;
        case 'briefcase':
          this.path = 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
          break;
        case 'document':
          this.path = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
          break;
        case 'share':
          this.path = 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z';
          break;
        case 'home':
          this.path = 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6';
          break;
        case 'plus':
          this.path = 'M12 6v6m0 0v6m0-6h6m-6 0H6';
          break;
        case 'folder':
          this.path = 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z';
          break;
        case 'circle-check':
          this.path = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        case 'chevron-down':
          this.path = 'M19 9l-7 7-7-7';
          break;
        case 'search':
          this.path = 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z';
          break;
        case 'info-circle':
          this.path = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        case 'bell':
          this.path = 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9';
          break;
        case 'chevron-right':
          this.path = 'M9 5l7 7-7 7';
          break;
        case 'chevron-double-right':
          this.path = 'M13 5l7 7-7 7M5 5l7 7-7 7';
          break;
        case 'heart':
          this.path = 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z';
          break;
        case 'pencil':
          this.path = 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z';
          break;
        case 'x-circle':
          this.path = 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        case 'file-download':
          this.path = 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
          break;
        case 'adjustments':
          this.path = 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4';
          break;
        case 'office-building':
          this.path = 'M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z';
          break;
        case 'filter':
          this.path = 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z';
          break;
        case 'upload':
          this.path = 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12';
          break;
        case 'trash':
          this.path = 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16';
          break;
        case 'sort-descending':
          this.path = 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4';
          break;
        case 'calendar':
          this.path = 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
          break;
        case 'clock':
          this.path = 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        default:
          this.path = '';
      }
    },
  },
};
</script>
