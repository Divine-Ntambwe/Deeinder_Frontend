import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  Profiler,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import "./MemberProfile.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import {
  display,
  fontSize,
  grid,
  gridColumn,
  height,
  justifyContent,
  textAlign,
} from "@mui/system";
import Button from "@mui/material/Button";
import { UserContext } from "../App.js";
import CommonNavbar from "../CommonNavbar/CommonNavbar.js";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Checkbox from "@mui/material/Checkbox";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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

function UserProfile() {
  const { user, url } = useContext(UserContext);
  const nav = useNavigate();
  const { get: getUser, result } = useFetch(
    `${url}/memberProfile/${user.username}`
  );
  const [newUsername, setUsername] = useState(""),
    [newShortDesc, setShortDesc] = useState(""),
    [newRelationshipIntent, setRelationshipIntent] = useState(""),
    [newPfpPath, setPfpPath] = useState(""),
    [newInterests, setInterests] = useState([]),
    [newAboutMe, setAboutMe] = useState({}),
    [newPicsPaths, setPicsPath] = useState([]),
    [pfpFile, setFile] = useState("");

  const [member, setMember] = useState(""),
    [likes, setLikes] = useState("");

  useEffect(() => {
    getUser((d) => {
      setMember(d);
      setLikes(d.likes.length);
    });
  }, []);

  useEffect(() => {
    setUsername(member.username);
    setShortDesc(member.shortDescription);
    setRelationshipIntent(member.relationshipIntent);
    setPfpPath(member.pfpPath);
    setInterests(member.interests);
    setAboutMe(member.aboutMe);
    setPicsPath(member.picsPaths);
  }, [member]);

  const addInterestInput = useRef();
  function handleAddInterest(e) {
    if (!newInterests.includes(addInterestInput.current.value)) {
      setInterests([...newInterests, addInterestInput.current.value]);
      addInterestInput.current.value = "";
    } else {
      alert("Interest Already Exists");
    }
  }

  function handleRemoveInterest(e) {
    const interest = e.target.parentElement.parentElement;

    setInterests(
      newInterests.filter((i) => {
        return i !== interest.children[1].textContent;
      })
    );
  }

  const pfpInput = useRef();
  function handleChangePfp() {
    pfpInput.current.click();
  }

  const editPopup = useRef();

  const {
    putMedia: update,
    error,
    data,
  } = useFetch(`${url}/UpdatemembersPersonalInfo/${user.username}`);

  function handleSave(e) {
    e.preventDefault();
    const newProfile = {
      username: newUsername,
      shortDescription: newShortDesc,
      relationshipIntent: newRelationshipIntent,
      interests: newInterests,
      aboutMe: newAboutMe,
    };

    for (let i in newProfile) {
      if (newProfile[i] === member[i]) {
        delete newProfile[i];
      }
    }

    const formData = new FormData();
    formData.append("updates", JSON.stringify(newProfile));
    formData.append("pfp", pfpFile);

    update(formData, () => {
      editPopup.current.style.display = "none";
      window.location.reload();
      if (newProfile.username){
        const updateUsername = JSON.parse(localStorage.getItem("user"))
        updateUsername.username = newProfile.username
        localStorage.setItem("user",JSON.stringify(updateUsername))
      }

    });
  }

  const { putMedia: addPicture } = useFetch(
    `${url}/addPictures/${user.username}`
  );
  const pictureInput = useRef();
  const [pictureFile, setPictureFile] = useState();

  function handleAddPicture(file) {
    const picture = new FormData();
    picture.append("picture", file);
    addPicture(picture, (d) => {
      window.location.reload();
    });
  }
  
  const {put:removePicture} = useFetch(`${url}/removePicture/${user.username}`)
  function handleRemovePicture(){
    removePicture({path:viewingPicture},()=>{
       window.location.reload();
    })
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
    <div className="user-profile profile">
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
          <Button sx={{color:"#cb6ce6"}} onClick={handleRemovePicture}>Remove Picture</Button>
          <Button sx={{color:"#cb6ce6"}} onClick={handleClose}>Cancel</Button>
        </DialogActions>
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        
        <DialogContent 
        sx={{backgroundColor:"black"}}
        >
         <img style={{width:"850px",height:"550px",objectFit:"contain"}} src={viewingPicture}/>
        </DialogContent>
        
      </Dialog>
      <form onSubmit={handleSave}>
        <div className="profile-popup-cont" ref={editPopup}>
          <div className="profile-popup">
            <div id="edit-prof-header">
              <h2>Edit Profile</h2>
              {error && <p id="display-error">{error}</p>}
              <div>
                <input
                  className="button"
                  value="save"
                  type="submit"
                  id="save-discard"
                />
                <input
                  className="button"
                  onClick={() => {
                    editPopup.current.style.display = "none";
                  }}
                  value="discard"
                  type="button"
                  id="save-discard"
                />
              </div>
            </div>

            {member && (
              <div>
                <div className="edit-pfp">
                  <div>
                    <img
                      src={
                        newPfpPath === member.pfpPath
                          ? url + "/" + member.pfpPath
                          : newPfpPath
                      }
                    />
                    <p>
                      <span>
                        {member.fullName}, {member.age}
                      </span>
                      <p></p>
                    </p>
                  </div>

                  <button type="button" onClick={handleChangePfp}>
                    Change Profile Picture
                  </button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setFile(file);
                      const imgUrl = URL.createObjectURL(file);
                      setPfpPath(imgUrl);
                    }}
                    // required
                    name="pfp"
                    id="pfp"
                    ref={pfpInput}
                  />
                </div>

                <label>
                  Username:<span style={{ color: "#cb6ce6" }}>*</span>
                </label>
                <input
                  required
                  value={newUsername}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label>
                  Short Description:<span style={{ color: "#cb6ce6" }}>*</span>
                </label>
                <input
                  required
                  spellcheck="true"
                  value={newShortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />

                <label>
                  Relationship Intent:
                  <span style={{ color: "#cb6ce6" }}>*</span>
                </label>
                <select
                  required
                  value={newRelationshipIntent}
                  onChange={(e) => {
                    setRelationshipIntent(e.target.value);
                  }}
                >
                  <option name="Short-term Fun">Short-term Fun</option>
                  <option name="Long-term Relationship">
                    Long-term Relationship
                  </option>
                  <option name="Short-term but open to long terms">
                    Short-term but open to long terms
                  </option>
                  <option name="Friends">Friends</option>
                </select>
                {newAboutMe && newAboutMe.Languages && (
                  <>
                    {" "}
                    <label>
                      Languages<span style={{ color: "#cb6ce6" }}>*</span>
                    </label>
                    <input
                      spellcheck="true"
                      required
                      value={
                        typeof newAboutMe["Languages"] !== "string"
                          ? newAboutMe["Languages"].join(", ")
                          : newAboutMe["Languages"]
                      }
                      onChange={(e) => {
                        setAboutMe({
                          ...newAboutMe,
                          Languages: e.target.value.replace(/(?<!,)\s/, ", "),
                        });
                      }}
                    />
                  </>
                )}

                <fieldset>
                  <legend>Interests</legend>

                  {newInterests &&
                    newInterests.map((i, k) => (
                      <div className="interests-edit" id={k}>
                        {" "}
                        <Checkbox
                          onChange={handleRemoveInterest}
                          icon={<RemoveCircleOutlineIcon />}
                        />{" "}
                        <label>{i}</label>{" "}
                      </div>
                    ))}
                  <input
                    className="add-interest"
                    id="add-interest"
                    ref={addInterestInput}
                  />
                  <input
                    type="button"
                    className="add-interest-btn button"
                    id="save-discard"
                    onClick={handleAddInterest}
                    value="add"
                  />
                </fieldset>

                {newAboutMe && (
                  <>
                    <label>You Live in?</label>
                    <input
                      value={newAboutMe["Lives In"]}
                      onChange={(e) => {
                        setAboutMe({
                          ...newAboutMe,
                          "Lives In": e.target.value,
                        });
                      }}
                    />

                    <label>You Grew Up in?</label>
                    <input
                      value={newAboutMe["Grew Up In"]}
                      onChange={(e) => {
                        setAboutMe({
                          ...newAboutMe,
                          "Grew Up In": e.target.value,
                        });
                      }}
                    />

                    <label>Ethnicity</label>
                    <input
                      value={newAboutMe["Ethnicity"]}
                      onChange={(e) => {
                        setAboutMe({
                          ...newAboutMe,
                          Ethnicity: e.target.value,
                        });
                      }}
                    />

                    <label>Job</label>
                    <input
                      value={newAboutMe["Job"]}
                      onChange={(e) => {
                        setAboutMe({ ...newAboutMe, Job: e.target.value });
                      }}
                    />

                    <label>Education</label>
                    <input
                      value={newAboutMe["Education"]}
                      onChange={(e) => {
                        setAboutMe({
                          ...newAboutMe,
                          Education: e.target.value,
                        });
                      }}
                    />

                    <label>Relationship Status</label>
                    <input
                      value={newAboutMe["Relationship Status"]}
                      onChange={(e) => {
                        setAboutMe({
                          ...newAboutMe,
                          "Relationship Status": e.target.value,
                        });
                      }}
                    />

                    <label>Religion</label>
                    <input
                      value={newAboutMe["Religion"]}
                      onChange={(e) => {
                        setAboutMe({ ...newAboutMe, Religion: e.target.value });
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="profile-navbar">
        <CommonNavbar />
      </div>
      <div id="body-mp">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "black",
          }}
        >
          <p
            className="edit-prof button"
            onClick={() => {
              editPopup.current.style.display = "flex";
            }}
          >
            <EditTwoToneIcon style={{ fontSize: "2.5em" }} />{" "}
          </p>
          <p
            className="edit-prof button"
            onClick={() => {
              localStorage.clear();
              nav("/Login");
              window.location.reload();
            }}
          >
            <LogoutIcon style={{ fontSize: "2.5em" }} />{" "}
          </p>
        </div>

        <div id="top-mp">
          <div id="member-pfp-cont">
            {member && <img id="member-pfp" src={`${url}/${member.pfpPath}`} />}
          </div>

          <div id="name-desc-likes-connec">
            {member && (
              <p className="name-age">
                {member.fullName}, {member.age}
              </p>
            )}
            {member && <p className="short-desc">{member.shortDescription}</p>}

            <div className="like-connection-grp">
              <div>
                <p style={{ cursor: "pointer" }} className="purple-text">
                  Profile Likes:
                </p>
                {member && <span>{`${member.likes.length}`} Likes</span>}
              </div>
            </div>

            <div className="like-connection-grp">
              <div>
                <p style={{ cursor: "pointer" }} className="purple-text">
                  Connection Requests:
                </p>
                <span>{member.connections} connections</span>
              </div>
            </div>
          </div>

          <div className="intent-intests">
            <div>
              <p className="rel-intent">Relationship Intent</p>
              <p className="purple-text">{member.relationshipIntent || "-"}</p>
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
            {member &&
              member.picsPaths.length !== 0 &&
              member.picsPaths.map((path) => <img onClick={()=>{handleClickOpen(`${url}/${path}`)}} src={`${url}/${path}`} />)}
            <AddPhotoAlternateIcon
              onClick={() => {
                pictureInput.current.click();
              }}
              sx={{ fontSize: "3em", cursor: "pointer" }}
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                // setPictureFile(file);
                handleAddPicture(file);
                // const imgUrl = URL.createObjectURL(file);
                // setPfpPath(imgUrl);
              }}
              // required
              name="picture"
              id="picture"
              ref={pictureInput}
            />
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
      </div>
    </div>
  );
}

export default UserProfile;
