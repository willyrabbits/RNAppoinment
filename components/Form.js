import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Button, TextInput, TouchableHighlight, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import shortid from 'shortid'

const Formulario = ({ citas, setCitas, setShowForm, saveApoinmentsStorage }) => {

    const [paciente, setPatient] = useState('');
    const [propietario, setOwner] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setFecha] = useState('');
    const [time, setHora] = useState('');
    const [sintomas, setSymthoms] = useState('');


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // date picker stuff
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit' }
        setFecha(date.toLocaleDateString('es-ES', options))
        hideDatePicker();
    };

    // time picker stuff
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        const options = { hour: 'numeric', minute: '2-digit' }
        setHora(time.toLocaleString('es-ES', options))
        hideTimePicker();
    };

    // creat meeting
    const createNewMeeting = () => {
        // validate
        if (paciente.trim() === '' ||
            propietario.trim() === '' ||
            //phone.trim() === '' ||
            //date.trim() === '' ||
            //time.trim() === '' ||
            sintomas.trim() === ''
        ) {
            // validation error 
            showAlert()
            return;
        }

        // create meeting
        const newCita = { paciente, propietario, phone, date, time, sintomas }
        newCita.id = shortid.generate()

        // add to state
        setCitas(citas => [...citas, newCita])

        // pasar nuevas citas al storage
        saveApoinmentsStorage(JSON.stringify([...citas, newCita]))

        // hide & reset form
        setShowForm(false)
    }

    // show alert
    const showAlert = () => {
        Alert.alert(
            'Error', // titulo
            'All the fields are mandatory', // alert message
            [{
                text: 'OK' // array de botones
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.form} >
                <View>
                    <Text style={styles.label}>Patient:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setPatient(texto)}
                        autoCorrect='false'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Owner:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setOwner(texto)}
                        autoCorrect='false'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Phone:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setPhone(texto)}
                        keyboardType='phone-pad'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Date:</Text>
                    <Button title="Show Date Picker" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                        headerTextIOS="custom title"
                        cancelTextIOS="oh jesus! NO"
                        confirmTextIOS="YEAAH!"
                    />
                    <Text>{date}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Time:</Text>
                    <Button title="Show Time Picker" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                        headerTextIOS="custom title"
                        cancelTextIOS="oh jesus! NO"
                        confirmTextIOS="YEAAH!"
                    />
                    <Text>{time}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Sympthoms:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setSymthoms(texto)}
                        multiline
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => createNewMeeting()} style={styles.btnSubmit}>
                        <Text style={styles.txtSubmit}>
                            Submit
                    </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10
    },
    txtSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Formulario
