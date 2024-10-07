import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Text, Image, Loader } from '@mantine/core';

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Pegando o ID da postagem da URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Buscar os detalhes da postagem pela API
      async function fetchPostDetails() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();

        // Adicionar uma imagem simulada à postagem
        const postWithImage = {
          ...data,
          coverImage: `/images/image-${id}.webp`, // Simulando caminho para a imagem
        };

        setPost(postWithImage);
        setLoading(false);
      }

      fetchPostDetails();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return <Text>Postagem não encontrada.</Text>;
  }

  return (
    <Container style={{ padding: '20px' }}>
      <Text component="h1" size="xl" weight={700} my="lg" align="center">
        {post.title}
      </Text>
      <Image
        src={post.coverImage || '/images/image-default.jpg'}
        alt={post.title}
        height={400}
        withPlaceholder
        style={{ objectFit: 'cover', width: '100%' }}
      />
      <Text size="sm" color="dimmed" my="md">
        {new Date().toISOString().split('T')[0]} {/* Data simulada */}
      </Text>
      <Text size="md" style={{ lineHeight: 1.6 }}>
        {post.body}
      </Text>
    </Container>
  );
};

export default PostDetails;
