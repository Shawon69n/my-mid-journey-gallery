import { useEffect, useState } from 'react';
import './App.css';
import { BsPlusCircle } from 'react-icons/bs';
import { auth, storage } from './firebase.init';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Swal from 'sweetalert2';
import { useAuthState } from 'react-firebase-hooks/auth';



function App() {
  const [uploadImg, setUploadImg] = useState(null);
  const [error, setError] = useState('');
  const [photoList, setPhotoList] = useState([]);

  const photoListRef = ref(storage, 'images/')


  const [user] = useAuthState(auth);

  const uploadPhoto = () => {
    if (uploadImg == null) {
      return setError('select a photo first');
    }
    else {
      setError('')
      const imageRef = ref(storage, `images/${uploadImg.name + v4()}`);
      uploadBytes(imageRef, uploadImg).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setPhotoList((prev) => [...prev, url])
          Swal.fire({
            text: 'Your image uploaded',
            target: '#custom-target',
            showConfirmButton: false,
            icon: 'success',
            customClass: {
              container: 'position-absolute'
            },
            toast: true,
            position: 'top-right'
          })
        })
      })
    }

  }

  useEffect(() => {
    listAll(photoListRef).then((res) => {
      res.items.forEach(item => {
        getDownloadURL(item).then((url) => {
          setPhotoList((prev) => [...prev, url])
        })
      });
    })
  }, [])

  // let allPhotos = [...new Set(photoList)]
  const openImg = (url) =>{
    Swal.fire({
      imageUrl: `${url}`,
      customClass: 'swal-wide',
      imageHeight: 600,
      showConfirmButton: false
      
    })
  } 

  return (
    <div>
      <Navbar></Navbar>


      <div className="main-section">

        {/* upload img section  */}
        {user? <div className='input-div'>
          <input onChange={(e) => { setUploadImg(e.target.files[0]) }} id="file" name="photo" type="file" accept='image/*' />
          <label htmlFor='file'> <span className='flex'><BsPlusCircle className='icon' /> <span className='text'>Choose a photo</span></span></label>
          <button onClick={uploadPhoto} className='upload-btn'>Upload</button>
          {error ? <p className='error'>{error}</p> : ''}
        </div> : ''}


        {/* displaying image  */}
        <div className="image-grid">
          {photoList.map((url) => <div className='img-card'><img src={url} onClick={()=>openImg(url)} alt=''></img></div>)}
        </div>

      </div>


      <Footer></Footer>

    </div>
  );
}

export default App;
