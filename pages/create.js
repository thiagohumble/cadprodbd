import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, Textarea, Button, Container, FileInput, Notification, Title } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }

    // Simular o envio de imagem e pegar uma URL simulada
    const coverImage = image ? URL.createObjectURL(image) : '/images/image-default.jpg';

    const newPost = {
      title,
      body: content,
      coverImage,
      date: new Date().toISOString().split('T')[0],
    };

    // Enviando os dados da postagem para a API falsa
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar postagem');
      }

      // Feedback de sucesso
      setSuccess(true);
      setError('');
      setTitle('');
      setContent('');
      setImage(null);

      // Redirecionar o usuário para a página inicial após 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      setError('Erro ao criar postagem');
    }
  };

  return (
    <Container >
      <Title order={1}>Criar nova postagem</Title>
      {error && <Notification color="red" onClose={() => setError('')}>{error}</Notification>}
      {success && <Notification color="green" onClose={() => setSuccess(false)}>Postagem criada com sucesso!</Notification>}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Título"
          placeholder="Digite o título da postagem"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
        />
        <Textarea
          label="Conteúdo"
          placeholder="Escreva o conteúdo da postagem"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          required
          minRows={6}
        />
        <FileInput
          label="Imagem de Capa"
          placeholder="Selecione uma imagem"
          value={image}
          onChange={setImage}
          icon={<IconUpload size={14} />}
          accept="image/*"
        />
        <Button type="submit" mt="lg">Criar Postagem</Button>
      </form>
    </Container>
  );
};

export default CreatePost;
