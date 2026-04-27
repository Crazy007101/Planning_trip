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

type ChecklistItem = {
  id: number;
  text: string;
  done: boolean;
};

export default function Checklist() {
  const [item, setItem] = useState<string>('');
  const [list, setList] = useState<ChecklistItem[]>([]);

  const addItem = () => {
    if (!item.trim()) return;

    setList([...list, { id: Date.now(), text: item, done: false }]);

    setItem('');
  };

  const toggleItem = (id: number) => {
    setList(list.map((el) => (el.id === id ? { ...el, done: !el.done } : el)));
  };

  const deleteItem = (id: number) => {
    setList(list.filter((el) => el.id !== id));
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
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <Button variant="contained" onClick={addItem}>
          Add
        </Button>
      </Box>

      <List>
        {list.map((el) => (
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
