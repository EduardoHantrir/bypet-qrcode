import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InfoItem from '../../component/card';
import '../../styles/petPerfil/petPerfil.css'

const PetPerfil = () => {
  const { petId } = useParams();
  const [data, setData] = useState(null);
  const [dataPet, setDataPet] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'post'), where('petId', '==', petId));
      const querySnapshot = await getDocs(q);
      const posts = await Promise.all(querySnapshot.docs.map(async doc => {
        const postData = doc.data();
        const imageRef = ref(storage, postData.endereco);
        const imageUrl = await getDownloadURL(imageRef);
        return { id: doc.id, imageUrl, ...postData };
      }));
      setData(posts);
    };

    const fetchPetData = async (petId) => {
      const docRef = doc(db, 'pet', petId); // Substitua 'pets' pela sua coleção
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setDataPet(docSnap.data())
      } else {
        console.log('No such document!');
      }
    }

    fetchPosts();
    fetchPetData(petId);
  }, [petId]);

  return (
    <div className='pet-profile'>
      {data && data.length > 0 ? (
        <>
          <Carousel infiniteLoop={true} showThumbs={false} showStatus={false}>
            {data.map((post, index) => (
              <div key={index} className='carousel-conteiner'>
                <img src={post.imageUrl} alt={post.Pet} className='carousel-img' />
              </div>
            ))}
          </Carousel>
          <InfoItem data={dataPet} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PetPerfil;
