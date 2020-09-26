import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita'
import Formulario from './components/Form'
import AsyncStorage from '@react-native-community/async-storage'

const App = () => {

    const [showForm, setShowForm] = useState(false)
    const [showFormText, setShowFormText] = useState('Show Form')

    //def state
    const [citas, setCitas] = useState([])

    useEffect(() => {
        const getApoinmentStorage = async () => {
            try {
                const citasStorage = await AsyncStorage.getItem('citas')
                if (citasStorage) {
                    setCitas(JSON.parse(citasStorage))
                }
            } catch (error) {
                console.warn(error)
            }
        }
        getApoinmentStorage()
    }, [])

    // remove patients from state
    const elimiarPaciente = id => {
        const citasFiltradas = citas.filter(cita => cita.id != id)
        setCitas(citasFiltradas)
        saveApoinmentsStorage(JSON.stringify(citasFiltradas))
    }

    // toggle form
    const toggleVisibilty = () => {
        setShowForm(!showForm)
        !showForm ? setShowFormText('Hide Form') : setShowFormText('Show Form');
    }

    // hide keyboard
    const closeKeyboard = () => {
        Keyboard.dismiss()
    }

    // store appointments
    const saveApoinmentsStorage = async (citasJSON) => {
        try {
            await AsyncStorage.setItem('citas', citasJSON)
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
            <View style={styles.container}>
                <Text style={styles.title}>Meetings Manager</Text>

                <View>
                    <TouchableHighlight onPress={() => toggleVisibilty()} style={styles.btnToggleForm}>
                        <Text style={styles.txtToggleForm}>
                            {showFormText}
                        </Text>
                    </TouchableHighlight>
                </View>


                <View style={styles.content}>

                    {showForm ? (
                        <>
                            <Text style={styles.title}>Create new meeting</Text>
                            <Formulario
                                citas={citas}
                                setCitas={setCitas}
                                setShowForm={setShowForm}
                                saveApoinmentsStorage={saveApoinmentsStorage}
                            />
                        </>
                    ) : (
                            <>
                                <Text style={styles.title}>{citas.length > 0 ? 'manage your meetings' : 'there is no meetings, add one'}</Text>
                                <FlatList
                                    style={styles.list}
                                    data={citas}
                                    renderItem={({ item }) => <Cita item={item} elimiarPaciente={elimiarPaciente} />}
                                    keyExtractor={cita => cita.id}
                                />
                            </>
                        )}

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AA076B',
        flex: 1
    },
    title: {
        color: '#DDD',
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        marginHorizontal: '2.5%'
    },
    list: {
        flex: 1
    },
    btnToggleForm: {
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10
    },
    txtToggleForm: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default App;
