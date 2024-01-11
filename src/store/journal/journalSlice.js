import { createSlice } from '@reduxjs/toolkit';

export const jornaulSlice = createSlice({
    name: 'jornaul',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
            state.messageSaved = '';
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';

        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if(note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        deleteNoteById: ( state, action ) => {

        },
    }
});
// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote, 
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = jornaulSlice.actions;