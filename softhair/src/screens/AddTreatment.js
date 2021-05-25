import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialButtonWithShadow from "../components/MaterialButtonWithShadow";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconButtonsFooter from "../components/MaterialIconButtonsFooter";
import RNPickerSelect from "react-native-picker-select";

export default class AddTreatment extends Component {

  render() {
        return (
        <View style={styles.container}>
          <View style={[styles.container_header]}>
                <View style={styles.leftIconButtonRow}>
                    <TouchableOpacity style={styles.leftIconButton} onPress={() => this.props.navigation.navigate('Home')}>
                    <MaterialCommunityIconsIcon
                        name="menu"
                        style={styles.leftIcon}
                    ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={styles.title}>            
                    </Text>
                    </View>
                </View>
                <View style={styles.leftIconButtonRowFiller}></View>
                <TouchableOpacity style={styles.rightIconButton} onPress={() => this.props.navigation.navigate('Auth')}>
                    <MaterialCommunityIconsIcon
                    name="dots-vertical"
                    style={styles.rightIcon}
                    ></MaterialCommunityIconsIcon>
                </TouchableOpacity>
                </View>
          <ScrollView
              horizontal={false}>
                <View style={styles.select}>
                <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "JavaScript", value: "JavaScript" },
                     { label: "TypeStript", value: "TypeStript" },
                     { label: "Python", value: "Python" },
                     { label: "Java", value: "Java" },
                     { label: "C++", value: "C++" },
                     { label: "C", value: "C" },
                 ]}
             />
             </View>
             <View style={styles.select}>
                <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "JavaScript", value: "JavaScript" },
                     { label: "TypeStript", value: "TypeStript" },
                     { label: "Python", value: "Python" },
                     { label: "Java", value: "Java" },
                     { label: "C++", value: "C++" },
                     { label: "C", value: "C" },
                 ]}
             />
             </View>
                <Text style={styles.colaborador}>Colaborador</Text>
                <Text style={styles.cliente}>Cliente</Text>
                <View style={styles.servicosRow}>
                    <Text style={styles.servicos}>Serviços</Text>
                    <MaterialButtonWithShadow
                    caption="Adicionar Serviço"
                    style={styles.materialButtonWithShadow}
                    ></MaterialButtonWithShadow>
                </View>
                <View style={styles.ozonioterapiaRow}>
                    <Text style={styles.ozonioterapia}>Ozonioterapia</Text>
                    <Text style={styles.r20000}>R$ 200,00</Text>
                    <MaterialButtonWithShadow
                    caption="Remover"
                    style={styles.materialButtonWithShadow1}
                    ></MaterialButtonWithShadow>
                </View>
                <View style={styles.altaFrequenciaRow}>
                    <Text style={styles.altaFrequencia}>Alta Frequência</Text>
                    <Text style={styles.r15000}>R$ 150,00</Text>
                    <MaterialButtonWithShadow
                    caption="Remover"
                    style={styles.materialButtonWithShadow2}
                    ></MaterialButtonWithShadow>
                </View>
                <View style={styles.produtosRow}>
                    <Text style={styles.produtos}>Produtos</Text>
                    <MaterialButtonWithShadow
                    caption="Adicionar Produto"
                    style={styles.materialButtonWithShadow5}
                    ></MaterialButtonWithShadow>
                </View>
                <View style={styles.escovaWetBrushRow}>
                    <Text style={styles.escovaWetBrush}>Escova Wet Brush</Text>
                    <Text style={styles.r20001}>R$ 150,00</Text>
                    <MaterialButtonWithShadow
                    caption="Remover"
                    style={styles.materialButtonWithShadow3}
                    ></MaterialButtonWithShadow>
                </View>
                <View style={styles.shampooKeuneRow}>
                    <Text style={styles.shampooKeune}>Shampoo Keune</Text>
                    <Text style={styles.r18000}>R$ 180,00</Text>
                    <MaterialButtonWithShadow
                    caption="Remover"
                    style={styles.materialButtonWithShadow3}
                    ></MaterialButtonWithShadow>
                </View>
                <Text style={styles.descricaoDetalhada}>Descrição Detalhada</Text>
                <MaterialFixedLabelTextbox
                    label="Digite uma descrição"
                    style={styles.materialFixedLabelTextbox2}
                ></MaterialFixedLabelTextbox>
                <TouchableOpacity onPress={this.addTreatment}>
                <MaterialButtonViolet
                    caption="SALVAR"
                    style={styles.materialButtonViolet}
                ></MaterialButtonViolet>
                </TouchableOpacity> 
            </ScrollView>
            <View style={[styles.container_footer]}>
                <TouchableOpacity style={styles.buttonWrapper1} onPress={() => this.props.navigation.navigate('Home')}>
                        <MaterialCommunityIconsIcon
                        name="calendar-text"
                        style={styles.icon1}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper2} onPress={() => this.props.navigation.navigate('ClientList')}>
                        <MaterialCommunityIconsIcon
                        name="alpha-c-box"
                        style={styles.activeIcon}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper3} onPress={() => this.props.navigation.navigate('ServiceList')}>
                        <MaterialCommunityIconsIcon
                        name="alpha-s-box"
                        style={styles.icon3}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrapper4} onPress={() => this.props.navigation.navigate('PermissionList')}>
                        <MaterialCommunityIconsIcon
                        name="alpha-p-box"
                        style={styles.icon4}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialHeader1: {
    height: 56,
    width: '100%',
  },
  container_footer: {
    backgroundColor: "#3f51b5",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
    height: 50
  },
  buttonWrapper1: {
    flex: 1,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  buttonWrapper2: {
    flex: 1,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  },
  buttonWrapper3: {
    flex: 1,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon3: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  buttonWrapper4: {
    flex: 1,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon4: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  select: {
    height: 43,
    width: 310,
    marginTop: 58,
    marginLeft: 33
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 310,
    marginTop: 20,
    marginLeft: 33
  },
  materialFixedLabelTextbox1: {
    height: 43,
    width: 310,
    marginTop: 10,
    marginLeft: 33
  },
  colaborador: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -143,
    marginLeft: 41
  },
  cliente: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 68,
    marginLeft: 41
  },
  servicos: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5
  },
  materialButtonWithShadow: {
    height: 26,
    width: 159,
    marginLeft: 120
  },
  servicosRow: {
    height: 26,
    flexDirection: "row",
    marginTop: 69,
    marginLeft: 41,
    marginRight: 32
  },
  ozonioterapia: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5
  },
  r20000: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 31,
    marginTop: 5
  },
  materialButtonWithShadow1: {
    height: 26,
    width: 103,
    backgroundColor: "rgba(210,82,82,1)",
    marginLeft: 26
  },
  ozonioterapiaRow: {
    height: 26,
    flexDirection: "row",
    marginTop: 41,
    marginLeft: 34,
    marginRight: 32
  },
  altaFrequencia: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5
  },
  r15000: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 21,
    marginTop: 5
  },
  materialButtonWithShadow2: {
    height: 26,
    width: 103,
    backgroundColor: "rgba(210,82,82,1)",
    marginLeft: 26
  },
  altaFrequenciaRow: {
    height: 26,
    flexDirection: "row",
    marginTop: 36,
    marginLeft: 34,
    marginRight: 32
  },
  produtos: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5
  },
  materialButtonWithShadow5: {
    height: 26,
    width: 159,
    marginLeft: 123
  },
  produtosRow: {
    height: 26,
    flexDirection: "row",
    marginTop: 29,
    marginLeft: 34,
    marginRight: 32
  },
  escovaWetBrush: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5
  },
  r20001: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 6,
    marginTop: 5
  },
  materialButtonWithShadow3: {
    height: 26,
    width: 103,
    backgroundColor: "rgba(210,82,82,1)",
    marginLeft: 26
  },
  escovaWetBrushRow: {
    height: 26,
    flexDirection: "row",
    marginTop: 104,
    marginLeft: 34,
    marginRight: 32
  },
  shampooKeune: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5
  },
  r18000: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 16,
    marginTop: 5
  },
  materialButtonWithShadow4: {
    height: 26,
    width: 103,
    backgroundColor: "rgba(210,82,82,1)",
    marginLeft: 26
  },
  shampooKeuneRow: {
    height: 26,
    flexDirection: "row",
    marginTop: -89,
    marginLeft: 34,
    marginRight: 32
  },
  descricaoDetalhada: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 83,
    marginLeft: 33
  },
  materialFixedLabelTextbox2: {
    height: 43,
    width: 310,
    marginTop: 7,
    marginLeft: 34
  },
  materialButtonViolet: {
    height: 36,
    width: 303,
    marginTop: 19,
    marginLeft: 40,
    marginBottom: 10
  },
  container_header: {
    backgroundColor: "#3F51B5",
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  leftIconButton: {
    padding: 11
  },
  leftIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  },
  textWrapper: {
    alignSelf: "flex-end",
    marginLeft: 21,
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    lineHeight: 18
  },
  leftIconButtonRow: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 3
  },
  leftIconButtonRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconButton: {
    padding: 11,
    alignItems: "center",
    marginRight: 5,
    marginTop: 5
  },
  rightIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  }
});