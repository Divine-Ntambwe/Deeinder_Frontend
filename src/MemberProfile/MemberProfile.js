import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import "./MemberProfile.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { grid, gridColumn, textAlign } from "@mui/system";
import Button from "@mui/material/Button";
import { UserContext } from "../App.js";
import CommonNavbar from "../CommonNavbar/CommonNavbar.js";
import { members } from "../Context/MembersContext.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MemberProfile() {
  const memberUsername = useParams().username;
  const { user, url } = useContext(UserContext);
  const [member, setMember] = useState();
  const { get: getMember, result } = useFetch(
    `${url}/memberProfile/${memberUsername}`
  );
  const likeButton = useRef();
  const [likes, setLikes] = useState();
  const { put: likeProfile } = useFetch(
    `${url}/likeProfile/${user.username}/${memberUsername}`
  );
  const { put: dislikeProfile } = useFetch(
    `${url}/dislikeProfile/${user.username}/${memberUsername}`
  );
  const { get: getConnections, result: allConnections } = useFetch(
    `${url}/connectionRequests/${memberUsername}`
  );

  const noPhotoText = useRef();
  const { post: postConnection } = useFetch(
    `${url}/connectionRequest/${user.username}/${memberUsername}`
  );
  const requestBtn = useRef();
  const { put: updateConnection } = useFetch(
    `${url}/removeConnectionRequest/${memberUsername}/${user.username}`
  );

  function hideText() {
    // noPhotoText.current.style.display = "none";
  }

  useEffect(() => {
    getMember((d) => {
      setMember(d);
      setLikes(d.likes.length);
    });
    getConnections();
  }, []);

  useEffect(() => {
    if (member && member.likes.includes(user.username)) {
      likeButton.current.style.color = "#cb6ce6";
    } else if (member) {
      likeButton.current.style.color = "gray";
    }
    console.log(allConnections)
    if (allConnections) {
      let found = allConnections.find(
        (connection) => connection.senderUsername === user.username
      );
      if (found && member) {
        requestBtn.current.style.color = "#cb6ce6";
      } else if (member) {
        requestBtn.current.style.color = "gray";
      }
      console.log(allConnections);
    }
  }, [member]);

  const handleLikeProfile = () => {
    if (likeButton.current.style.color === "gray") {
      likeProfile({}, () => {
        likeButton.current.style.color = "#cb6ce6";
        setLikes(likes + 1);
      });
    } else {
      dislikeProfile({}, () => {
        likeButton.current.style.color = "gray";
        setLikes(likes - 1);
      });
    }
  };

  function handleSendConnectionRequest() {
    if (requestBtn.current.style.color === "gray") {
      postConnection({}, () => {
        requestBtn.current.style.color = "#cb6ce6";
      });
    } else {
      updateConnection({}, () => {
        requestBtn.current.style.color = "gray";
      });
    }
  }

  const [viewingPicture,setViewingPicture] = useState("")
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = (path) => {
      setOpen(true);
      setViewingPicture(path)
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div id="MemberProfile profile">
      <Dialog
              open={open}
              slots={{
                transition: Transition,
              }}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              fullWidth={true}
              maxWidth={"md"}
              // sx={{width:"500px"}}
            >
              <DialogActions  sx={{backgroundColor:"black"}}>
                {/* <Button sx={{color:"#cb6ce6"}} onClick={handleRemovePicture}>Remove Picture</Button> */}
                <Button sx={{color:"#cb6ce6"}} onClick={handleClose}>Close</Button>
              </DialogActions>
              {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
              
              <DialogContent 
              sx={{backgroundColor:"black"}}
              >
               <img style={{width:"850px",height:"550px",objectFit:"contain"}} src={viewingPicture}/>
              </DialogContent>
              
            </Dialog>
      <div id="body-mp">
        <div className="profile-navbar">
          <CommonNavbar />
        </div>

        {result && (
          <>
            <div id="top-mp">
              <div id="member-pfp-cont">
                {member && (
                  <img id="member-pfp" onClick={()=>{handleClickOpen(`${url}/${member.pfpPath}`)}}  src={`${url}/${member.pfpPath}`} />
                )}
              </div>

              <div id="name-desc-likes-connec">
                {member && (
                  <p className="name-age">
                    {member.fullName}, {member.age}
                  </p>
                )}
                {member && (
                  <p className="short-desc">{member.shortDescription}</p>
                )}

                <div className="like-connection-grp">
                  <div>
                    <p
                      style={{ cursor: "pointer" }}
                      className="purple-text"
                      onClick={handleLikeProfile}
                    >
                      Like Profile
                    </p>
                    {member && <span>{`${likes}`} Likes</span>}
                  </div>
                  <FavoriteIcon
                    className="Like-Req-btn"
                    ref={likeButton}
                    onClick={handleLikeProfile}
                    style={{
                      fontSize: "72px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div className="like-connection-grp">
                  <div>
                    <p
                      style={{ cursor: "pointer" }}
                      className="purple-text"
                      onClick={handleSendConnectionRequest}
                    >
                      Send Connection Request
                    </p>
                    <span>{member.connections} connections</span>
                  </div>
                  <span
                    className="Like-Req-btn"
                    ref={requestBtn}
                    style={{ color: "gray", cursor: "pointer" }}
                    onClick={handleSendConnectionRequest}
                  >
                    <i className="fa-solid fa-users-rays"></i>
                  </span>
                </div>
              </div>

              <div className="intent-intests">
                <div>
                  <p className="rel-intent">Relationship Intent</p>
                  <p className="purple-text">
                    {member.relationshipIntent || "-"}
                  </p>
                </div>

                <div>
                  <p className="short-desc">Interests</p>
                  <div className="interests">
                    {member && member.interests.map((i) => <span>{i}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div id="bottom-mp">
              <p>Photos</p>

              <div class="images-container">
                {!member.picsPaths.length && (
                  <p style={{ gridColumn: "1/span 3" }} ref={noPhotoText}>
                    {" "}
                    <CameraAltOutlinedIcon /> No Photos Yet
                  </p>
                )}
                {member && member.picsPaths.length !== 0 && hideText()}
                {member &&
                  member.picsPaths.length !== 0 &&
                  member.picsPaths.map((path) => (
                    <img src={`${url}/${path}`} onClick={()=>{handleClickOpen(`${url}/${path}`)}} />

                  ))}
              </div>

              <p>About</p>
              <div className="aboutMe">
                {member &&
                  Object.keys(member.aboutMe).map((k) => (
                    <span className="about-prop">
                      {k}:{" "}
                      <span className="about-val">
                        {typeof member.aboutMe[k] == "string"
                          ? member.aboutMe[k]
                          : member.aboutMe[k].toString()}
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MemberProfile;
