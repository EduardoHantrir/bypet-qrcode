// Importando os componentes necessários do React e React Router
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InfoItem from '../../component/card';
import '../../styles/petPerfil/petPerfil.css'

// Definindo o componente PetPerfil
const PetPerfil = () => {
  // Obtendo o id do pet dos parâmetros da URL
  const { petId } = useParams();
  // Definindo o estado inicial para os dados do post e do pet
  const [data, setData] = useState(null);
  const [dataPet, setDataPet] = useState([])

  // Usando o hook useEffect para buscar os posts e os dados do pet quando o componente é montado
  useEffect(() => {
    const fetchPosts = async () => {
      // Buscando os posts do pet no Firestore
      const q = query(collection(db, 'post'), where('petId', '==', petId));
      const querySnapshot = await getDocs(q);
      const posts = await Promise.all(querySnapshot.docs.map(async doc => {
        const postData = doc.data();
        // Buscando a URL da imagem do post no Firebase Storage
        const imageRef = ref(storage, postData.endereco);
        const imageUrl = await getDownloadURL(imageRef);
        return { id: doc.id, imageUrl, ...postData };
      }));
      setData(posts);
    };

    const fetchPetData = async (petId) => {
      // Buscando os dados do pet no Firestore
      const docRef = doc(db, 'pet', petId);
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
      {/* Renderizando o carrossel de imagens e o componente InfoItem se os dados existirem */}
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
        <>
          <div className='loading'>
            <img src={require('../../assets/icons/BY PET LOGO 3 1.png')} alt='logo BY PET' className='logo' />
            <p>Carregando</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PetPerfil;
