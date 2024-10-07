import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, TouchableOpacity, Picker } from 'react-native';
import { Formik } from 'formik';
import { apiAxios, route } from '../../apiAxios_route';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [editingProducto, setEditingProducto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el buscador

  useEffect(() => {
    getProductos();
    getProveedores();
  }, []);

  function getProductos() {
    apiAxios.get(route('productos.index')).then(response => {
      setProductos(response.data);
    });
  }

  function getProveedores() {
    apiAxios.get(route('proveedores.index')).then(response => {
      setProveedores(response.data);
    });
  }

  function putProductos(values) {
    apiAxios.put(route('productos.update', values.id), values).then(response => {
      setProductos(productos.map(producto =>
        producto.id === response.data.id ? response.data : producto
      ));
      setEditingProducto(null);
    });
  }

  function deleteProductos(id) {
    apiAxios.delete(route('productos.destroy', id)).then(() => {
      setProductos(productos.filter(p => p.id !== id));
    });
  }

  // Filtrar productos por nombre
  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProductos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {editingProducto && editingProducto.id === item.id ? (
        <Formik
          initialValues={{
            nombre: editingProducto.nombre,
            descripcion: editingProducto.descripcion,
            precio: editingProducto.precio.toString(),
            stock: editingProducto.stock.toString(),
            proveedor_id: editingProducto.proveedor_id
          }}
          onSubmit={(values) => putProductos({ ...editingProducto, ...values })}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
                placeholder="Editar nombre"
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                value={values.precio}
                onChangeText={handleChange('precio')}
                onBlur={handleBlur('precio')}
                placeholder="Editar precio"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={values.stock}
                onChangeText={handleChange('stock')}
                onBlur={handleBlur('stock')}
                placeholder="Editar stock"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
              <Picker
                selectedValue={values.proveedor_id}
                onValueChange={handleChange('proveedor_id')}
              >
                {proveedores.map(proveedor => (
                  <Picker.Item key={proveedor.id} label={proveedor.nombre} value={proveedor.id} />
                ))}
              </Picker>
              <View style={styles.buttonGroup}>
                <Button onPress={handleSubmit} title="Guardar" color="#4CAF50" />
                <Button onPress={() => setEditingProducto(null)} title="Cancelar" color="#F44336" />
              </View>
            </View>
          )}
        </Formik>
      ) : (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Text style={styles.itemText}>Precio: {item.precio}$</Text>
          <Text style={styles.itemText}>Stock: {item.stock}</Text>
          <Text style={styles.itemText}>{item.proveedor.nombre}</Text>
          <View style={styles.buttonGroup}>
            <Button onPress={() => setEditingProducto(item)} title="Editar" color="#2196F3" />
            <Button onPress={() => deleteProductos(item.id)} title="Eliminar" color="#F44336" />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.cuerpo}>

    
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>

      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Buscar por nombre"
        placeholderTextColor="#888"
      />

      {/* Encabezado de la tabla */}
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Nombre</Text>
        <Text style={styles.columnHeader}>Precio</Text>
        <Text style={styles.columnHeader}>Stock</Text>
        <Text style={styles.columnHeader}>Proveedor</Text>
        <Text style={styles.columnHeader}>Acciones</Text>
      </View>

      <FlatList
        data={currentItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Paginación */}
      <View style={styles.pagination}>
        {pageNumbers.map(number => (
          <TouchableOpacity key={number} onPress={() => setCurrentPage(number)} style={styles.pageButton}>
            <Text style={styles.pageText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Agregar Producto</Text>
      {proveedores.length > 0 ? (
        <Formik
          initialValues={{ nombre: "", precio: "", stock: "", proveedor_id: proveedores[0].id }}
          onSubmit={async (values, { resetForm }) => {
            apiAxios.post(route('productos.store'), values).then(response => {
              setProductos([...productos, response.data]);
              resetForm();
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
                placeholder="Ingresa nombre"
                placeholderTextColor="#888"
              />
              <Text style={styles.label}>Precio</Text>
              <TextInput
                style={styles.input}
                value={values.precio}
                onChangeText={handleChange('precio')}
                onBlur={handleBlur('precio')}
                placeholder="Ingresa precio"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
              <Text style={styles.label}>Stock</Text>
              <TextInput
                style={styles.input}
                value={values.stock}
                onChangeText={handleChange('stock')}
                onBlur={handleBlur('stock')}
                placeholder="Ingresa stock"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
              <Text style={styles.label}>Proveedor</Text>
              <Picker
  selectedValue={values.proveedor_id}
  onValueChange={handleChange('proveedor_id')}
  style={styles.picker} // Aplica estilo aquí
>
  {proveedores.map(proveedor => (
    <Picker.Item key={proveedor.id} label={proveedor.nombre} value={proveedor.id} />
  ))}
</Picker>
              <Button onPress={handleSubmit} title="Crear producto" color="#4CAF50" />
            </View>
          )}
        </Formik>
      ) : (
        <Text>Cargando proveedores...</Text>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cuerpo: {
    flex: 1,
  },
  container: {
    
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  pageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 1,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff', // Fondo blanco para que se vea más limpio
    color: '#333', // Color del texto
    marginBottom: 10,
    paddingHorizontal: 10,
   }
});
