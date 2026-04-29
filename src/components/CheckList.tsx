import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ChecklistProps } from '../types/types.ts';

export default function Checklist({ items, setItems }: ChecklistProps) {
  const [input, setInput] = useState('');

  const addItem = () => {
    if (!input.trim()) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        done: false,
      },
    ]);

    setInput('');
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              done: !el.done,
            }
          : el,
      ),
    );
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Packing Checklist
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Add item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button variant="contained" onClick={addItem}>
          Add
        </Button>
      </Box>

      <List>
        {items.map((el) => (
          <ListItem
            key={el.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#f8fafc',
              mb: 1,
              borderRadius: 2,
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={el.done} onChange={() => toggleItem(el.id)} />

              <ListItemText
                primary={el.text}
                sx={{
                  textDecoration: el.done ? 'line-through' : 'none',
                  color: el.done ? 'gray' : 'inherit',
                }}
              />
            </Box>

            <IconButton onClick={() => deleteItem(el.id)} size="small">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
