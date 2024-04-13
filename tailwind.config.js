module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Roboto, sans-serif",
      body: "Open Sans",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1170px",
    },
    extend: {
      colors: {

        primary: {
          '50': '#faf7fc',
          '100': '#f4edfa',
          '200': '#e9dbf3',
          '300': '#dabee9',
          DEFAULT: '#c497db',
          Button: '#a96dc8',
          Hover: '#8d4eab',
          Active: '#753e8c',
          '800': '#623573',
          '900': '#532f60',
          '950': '#33153d',
        },
        
        secondary: {
          '50': '#effefa',
          '100': '#c8ffee',
          '200': '#92fdde',
          '300': '#53f5cc',
          '400': '#20e1b6',
          DEFAULT: '#08c49e',
          Hover: '#03a688',
          Active: '#077e6a',
          '800': '#0b6456',
          '900': '#0f5248',
          '950': '#01322c',
        },
        
        Background : {
          '50': '#f3faf8',
          '100': '#d7f0e9',
          '200': '#9ad9c9',
          '300': '#7ecab9',
          '400': '#53ae9d',
          '500': '#3a9284',
          '600': '#2c756b',
          '700': '#275e57',
          '800': '#234c48',
          '900': '#21403c',
          '950': '#0e2524',
        },
      
        accent: {
          '50': '#fefbec',
          '100': '#fbf2ca',
          '200': '#f8e68f',
          '300': '#f4d455',
          DEFAULT: '#f2c641',
          '500': '#eaa116',
          '600': '#cf7c10',
          '700': '#ac5911',
          '800': '#8c4614',
          '900': '#733914',
          '950': '#421d06',
        },

        neutral:{
          '50': '#f8f8f8',
          '100': '#f2f2f2',
          DEFAULT: '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
        },

        gray: "#766F66",
        white: "#ffffff",
        
      },
      spacing: {
        54: "54px",
        800: "800px",
      },

      content: {
        quote: 'url("assets/img/quoteMark.png")',
      },
    },
  },
  plugins: [],
};
