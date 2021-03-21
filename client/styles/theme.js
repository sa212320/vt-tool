import { createMuiTheme } from '@material-ui/core/styles';
import { hidden } from 'colors';

const titlebarHeight = 64;

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {

        },
        body: {
          height: '100%',

          backgroundColor:'#EEE',
        },
        '#__next':{
          height: '100vh',
        },
        '.mainRoot':{
          display: 'flex',
          height: `100%`,
        },
        '.main0':{
          height: `100%`,
          width: `100%`,
          display: 'flex',
          transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          '&.onOpen':{
            width: 'calc(100% - 250px)',
            transform: 'translateX(250px)',
          },
        },
        '.MuiDrawer-paper':{
          width: 250,
          marginTop: 64,
        },
        '.drawerTitle':{
          height:64,
          textAlign: 'right',
          padding: 8,
        },
        '.main':{
          paddingTop: titlebarHeight,
          height: `100%`,
          width: '100%', 
        },
        '.page':{
          overflow:'auto',
          height: '100%',
          flex:1
        },
        '.inline-block':{
          display: 'inline-block',
        },
        '.MuiCollapse-container':{
          transitionDuration: '200ms !important',
        },
        '.MuiAccordionDetails-root':{
          flexWrap: 'wrap',
        },
        '.loadingYoutube': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          '&>img':{
            minWidth: '100%',
            minHeight: '100%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          },
          '&>div':{
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            '&>div':{
              position: 'absolute',
              left: '50%',
              top: '50%',
            }
          }
        },
        '.loadingYtc': {
          '&>div':{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        },
        '.yt':{
          width: '100%',
          height: '100%',
          position: 'relative',
        },
        '.ytc':{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        },
        '.count1':{
          width: '100%',
          height: '100%',
        },
        '.count2':{
          width: '100%',
          height: 'calc(50% - 1px)',
          padding: 1,
        },
        '.count3, .count4':{
          width: '50%',
          height: 'calc(50% - 1px)',
          padding: 1,
        },
        '.count5, .count6, .count7, .count8, .count9':{
          width: '33%',
          height: '33%',
          padding: 1,
        },

        '.watchRoot': {
          textAlign: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          '& .imgRoot':{
            position: 'relative',
            display: 'inline-block',
            float: 'left',
            cursor: 'pointer',
          },
          '& .videoRoot':{
            position: 'relative',
            float: 'left',
          },
          '& .left' :{
            backgroundColor: '#DDD',
            width: 'calc(100% - 300px)',
            height: '100%',
          },
          '& .right' :{
            width: 300,
            overflowX: 'hidden',
            padding: '10px 9px',
            position: 'relative',
          },
          '& .rightDiv':{
            display: 'inline-block',
          },
          '& .rightPlayVideo':{
            width: 100,
            border: '3px solid black',
            borderRadius: 12,
            margin: '10px 3px 0px 4px',
          },
          '& .rightPlayVideoChat':{
            width: 48,
            border: '3px solid black',
            borderRadius: 12,
            margin: '10px 3px 0px 4px',
          },
          '& .rightPlayVideoActice':{
            border: '3px solid green',
          },
          '& .checkIcon':{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'green',
            color: 'white',
            borderRadius: '50%',
          },
          '& .vtuber':{
            position: 'absolute',
            left: '60%',
            top: '37%',
            width: '40%',
            border: '2px solid',
            borderRadius: '50%',
            zIndex:1
          },
          '& .videoTitle':{
            width: 100,
            display: 'block',
            overflow: 'hidden',
            textAlign: 'left',
            height: 40,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden',
          },
          '& .selectDiv': {
            marginTop: 15,
          },
          '& .searchInputDiv':{
            width: 100,
            position: 'absolute',
            right: 44,
            '&>*':{
              verticalAlign: 'middle',
            },
            '&>span':{
              border: '1px solid',
              display: 'inline-block',
              height: 24,
              borderWidth: '1px 1px 1px 0px',
              backgroundColor: 'papayawhip',
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3
            },
          },
          '& .searchInput':{
            border: '1px solid',
            width: 68,
            height: 24,
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3
          },
          '& .loadingDiv':{
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.8)',
            height: '100%',
            left: 0,
            top: 0,
            zIndex: 1,
            '&>div':{
              position: 'absolute',
              top: 'calc(50% - 20px)',
              left: 'calc(50% - 20px)',
            }
          },
          '& .live': {
            backgroundColor: 'red',
            color: 'white',
            borderRadius: 10,
            padding: '0px 5px',
            position: 'absolute',
            whiteSpace: 'nowrap',
            left: '23%',
            transform: `translateX(-50%)`,
            bottom: 41,
          },
          '& .rightTab':{
            marginTop: -10,
            marginLeft: -9,
            marginRight: -9,
            '&>div':{
              display: 'inline-block',
              width: '49%',
              backgroundColor: 'white',
              border: '1px solid #EEEEEE',
              padding: 9,
              cursor: 'pointer',
              '&:hover':{
                backgroundColor: '#DDD',
              }
            },
            '&>.choose':{
              backgroundColor: '#EEEEEE',
            },
          },
          '& .chatroom':{
            height: 'calc(100% - 40px)',
            display: 'none',
            '&>.videoList':{
              display: 'inline-block',
            },
            '&>.videoChat':{
              position: 'relative',
              height: 'calc(100% - 40px)',
            },
          },
          '& .displayShow':{
            display: 'block',
          }
        },
        '.indexRoot':{
          overflow: 'auto',
          padding:' 0 40px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& .logoImg':{
            width: '100%',
            maxWidth: 400,
            verticalAlign: 'middle',
            // transform: 'translateX(10%)',
          },
          '& .titleDiv':{
            // display: 'inline-block',
            verticalAlign: 'middle',
          },
          '& .title':{
            fontSize: 63,
            // marginTop: 60,
            '&.mobile':{
              fontSize: 40,
              marginTop: 0,
            },
          },
          '& .description':{
            fontSize: 20,
          },
          '& .indexPage':{
            textAlign: 'center',
            marginRight: 93,
            marginLeft: 93,
            minWidth: 200,
          },
          '& .indexPageDiscriptions':{
            textAlign: 'left',
            paddingTop: 80,
            '&>div':{
              paddingLeft: 20,
            }
          },
          
          '& .youtubeImg':{
            maxWidth: 100,
            width: '100%',
            verticalAlign: 'middle',
          },
          '& .twitterImg':{
            maxWidth: 34,
            width: '100%',
            verticalAlign: 'middle',
            margin: 5
          },
          '& .discordImg':{
            width: 64,
            verticalAlign: 'middle',
            borderRadius: 10,
            marginRight: 18,
            marginLeft: 18,
          },
          '& .logoTitleImg':{
            verticalAlign: 'middle',
            borderRadius: 10,
          },
        },
        '.privacyRoot':{
          overflow: 'auto',
          padding:' 0 40px',
          '& .logoImg':{
            width: '100%',
            maxWidth: 400,
            verticalAlign: 'middle',
            transform: 'translateX(10%)',
          },
          '& .paddingL':{
            paddingLeft: 20,
          },
        },
        '.vtuberRoot':{
          height: '100%',
          overflow: 'auto',
          padding:'40px',
          width: '100%',
        },
        '.titleBarRoot':{
          position: 'fixed',
          width: '100%',
          height: 64,
          backgroundColor:'white',
          paddingLeft: 20,
          '& .logoImg': {
            height: 64,
            verticalAlign: 'middle',
            marginLeft: 24,
            cursor: 'pointer',
          },
          '& .title':{
            fontSize: 22,
            fontWeight: 800,
            verticalAlign: 'middle',
            cursor: 'pointer',
            color: 'black'
          },
          '& .link':{
            textDecoration: 'auto',
          },
        },
        '.displayFlex':{
          display: 'flex',
        },
        '.flexWrap':{
          flexWrap: 'wrap',
        },
        '.videoPageRoot':{
          height: '100%',
          overflow: 'auto',
          padding:'40px',
          width: '100%',
          '& .videoTitle':{
            position: 'relative',
            display: 'flex',
            fontSize: 20,
            fontWeight: 800,
            marginTop:100,
            marginBottom:15,
            '&.first':{
              marginTop:0,
            },
            '&::after':{
              content:'""',
              display: 'block',
              flex:1,
              borderTop: '1px solid #AAA',
              position: 'relative',
              top:14,
              marginLeft: 5,
            },
            '&::before':{
              content:'""',
              display: 'block',
              flex:1,
              borderTop: '1px solid #AAA',
              position: 'relative',
              top:14,
              marginRight: 5,
            },
          },
        },
        '.isTabActive':{
          backgroundColor: '#EEE !important',
        },
        '.vtuberList':{
          paddingTop: 20,
          '&>div':{
            display: 'flex',
            flexWrap: 'wrap',
          }
        },
        '.drawer':{
          '& .indexPageDiscriptions':{
            textAlign: 'right',
            position:'absolute',
            bottom:70,
            width: '100%',
            '&>div':{
              textAlign: 'left',
              paddingLeft: 22,
            },
            '& svg': {
              verticalAlign: 'middle',
              marginLeft: 10,
              marginRight: 10,
            },
            '$ a':{
              verticalAlign: 'middle',
            },
          },
          '& .dvdImg':{
            width: 81,
            position: 'absolute',
            left: 132,
            top: 48,
            pointerEvents: 'none',
          },
          '& .youtubeImg':{
            maxWidth: 100,
            width: '100%',
            verticalAlign: 'middle',
          },
          '& .twitterImg':{
            maxWidth: 34,
            width: '100%',
            verticalAlign: 'middle',
            margin: 5
          },
          '& .discordImg':{
            width: 64,
            verticalAlign: 'middle',
            borderRadius: 10,
            marginRight: 18,
            marginLeft: 18,
          },
        },
        '.allVideoText':{
          '& .searchInputDiv':{
            '&>*':{
              verticalAlign: 'middle',
            },
            '&>span':{
              border: '1px solid',
              display: 'inline-block',
              height: 24,
              borderWidth: '1px 1px 1px 0px',
              backgroundColor: 'papayawhip',
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3
            },
          },
          '& .searchInput':{
            border: '1px solid',
            width: 200,
            height: 24,
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3
          },
        },
        '.add':{
          width:'50%'
        }
      },
    },
  },
});

export default theme;