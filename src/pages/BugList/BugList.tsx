/* eslint-disable max-len */
import { Save } from "@mui/icons-material";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import ProfileMe from '../../assets/images/profile.png';
import React from 'react'
import './BugList.scss';

const MOCK_LIST = [
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  },
  {
    "bugDescription": {
      "content": {
          "time": 1649721967827,
          "blocks": [
              {
                  "id": "t-OyhEvO-s",
                  "type": "paragraph",
                  "data": {
                      "text": "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  }
              },
              {
                  "id": "07MDZPSyHE",
                  "type": "header",
                  "data": {
                      "text": "Why do we use it?",
                      "level": 2
                  }
              },
              {
                  "id": "2frNSPFImU",
                  "type": "paragraph",
                  "data": {
                      "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                  }
              }
          ],
          "version": "2.23.2"
      },
    },
    "bugId": "1ecd8a25-a632-4906-9547-1761c6b5bac3",
    "title": "Some random bug Id here just in case bla bla"
  }
];

const BugList: React.FC = () => {
  return (
    <div className={'BugList'}>

        <div className={'BugList__filters'}>
          <Typography variant={'subtitle1'}>Total Bugs <span>1</span></Typography>
          <Typography variant={'subtitle1'}>Filter by</Typography>
          <div>
            <span>filter 1</span>
            <span>filter 2</span>
            <span>filter 3</span>
            <span>filter 4</span>
            <span>filter 5</span>
            <span>filter 7</span>
          </div>
        </div>

        <div className="BugList__cards">
            {MOCK_LIST.map(({ bugDescription, bugId, title }) => {
              const { content } = bugDescription;
              const { time, blocks } = content;

              const date = new Date(time).toLocaleDateString()
              
              return (
                <div key={bugId} className='BugList__inner__card'>
                  <CardHeader title={title} subheader={date} />

                  <CardContent>
                    <p>{blocks.at(0)?.data.text}</p>
                  </CardContent>

                  <CardActions>
                    <Tooltip placement={'bottom'} title={'Profile'}>
                      <Avatar className={'UserAvatar'} alt="Matheus Vaillant" src={ProfileMe} sx={{ width: 30, height: 30 }}/>
                    </Tooltip>
                    <IconButton>
                      <Save/>
                    </IconButton>
                  </CardActions>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default BugList