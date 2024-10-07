import { useEffect, useState } from 'react';
import { Button, Container, Grid, Card, Image, Text, Title } from '@mantine/core';
import Link from 'next/link';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();

      const postsWithImagesAndDates = data.slice(0, 6).map((post, index) => ({
        ...post,
        coverImage: `/images/image-${index + 1}.webp`, // caminho para imagem de capa
        date: new Date().toISOString().split('T')[0], // Data simulada
      }));

      setPosts(postsWithImagesAndDates);
    }

    fetchPosts();
  }, []);

  return (
    <Container>
      <Text component="h1" align="center" size="xl" weight={700} my="lg">
        	<Title order={1}>Blog*</Title>
      </Text>

      <Link href="/create" passHref>
        <Button component="a" mb="lg">Criar Nova Postagem</Button>
      </Link>

      <Grid gutter="lg"> {/* Adicionei um gutter maior para espaçamento */}
        {posts.map(post => (
          <Grid.Col key={post.id} xs={12} sm={6} md={4} lg={4}> {/* Mantendo responsividade */}
          	<Link href={`/posts/${post.id}`} passHref>
	            <Card shadow="sm" padding="lg" radius="md" withBorder align="center">
	              <Card.Section>
	                <Image
	                  src={post.coverImage || '/images/image-default.jpg'}
	                  alt={post.title}
	                  height={400}
	                  width={200}
	                  withPlaceholder
	                  style={{ objectFit: 'cover', width: '50%', objectPosition: '80% 80%' }} // Adicionei largura total
	                />
	              </Card.Section>

	              <Text component="h3" size="lg" weight={600} mt="md">
	                {post.title}
	              </Text>
	              <Text size="sm" color="dimmed">
	                {post.date}
	              </Text>
	            </Card>
          	</Link>
          </Grid.Col>
        ))}
      </Grid>
      	<Title order={6}>* imagens de meu direito autoral retirada de meu site <a href="www.humbletrips.com.br" >www.humbletrips.com.br</a></Title>
    </Container>
  );
};

export default Home;
