<%-- <%@page import="com.ibm.cio.cmr.portal.user.AppUser"%> --%>
<%-- <%@page import="org.apache.commons.lang.StringUtils"%> --%>
<%@page import="com.fengwei.service.Jdbc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="page" tagdir="/WEB-INF/tags"%> --%>
<%-- <%@ taglib uri="/tags/cmr" prefix="cmr"%> --%>

<%
  //AppUser user = AppUser.getUser(request);
  //String geo = user.getGeo();
   String country ="US";
//   System.out.println(country);
%>
<%-- <script> var userCountry = "<%=country%>"; </script> --%>
<script> var country = "US"; </script>
<%if ("US".equals(country) || "CA".equals(country)) {%>
<!-- This is the original FindCMR page for US -->
<page:template selectedNav="REQUEST">
  <jsp:body>  
 
 
 <div id="bodyDiv" onkeypress="enterEvent(event)">
  <cmr:controller name="FindCMRController" js="js/controller_findcmr.js">
  <cmr:row addBackground="true">
    <cmr:column>
        <p class="ibm-form-elem-grp">
          <label for="enterpriseNo">Customer Name:</label>        
          <span>{{search.enterpriseNo.value}} - {{search.enterpriseName.value}}</span>      
        </p>
     </cmr:column>
    <cmr:column>
      <cmr:text label="End User Name" fieldName="customerName" modelName="search.customerName" />
    </cmr:column>
    <cmr:column>
      <cmr:text label="CMR Number" fieldName="cmrNo" modelName="search.cmrNo" />
    </cmr:column>
    <cmr:column> 
      <cmr:select label="Country" fieldName="landCntry" modelName="search.landCntry" modelValues="countries" width="300" onChange="countryChange()"/>
    </cmr:column>
  </cmr:row>
  <cmr:row addBackground="true">
    <cmr:column>
      <cmr:text label="Street Address" fieldName="street" modelName="search.street" />
    </cmr:column>
    <cmr:column>
      <cmr:text label="City" fieldName="city" modelName="search.city"  />
    </cmr:column>
    <cmr:column>
      <cmr:select label="State" fieldName="state" modelName="search.state" modelValues="states" width="300" onChange="stateChange()"/>
    </cmr:column>
    <cmr:column>
      <cmr:text label="Postal Code" fieldName="postCd" modelName="search.postCd" />
    </cmr:column>

    <cmr:column>
      <cmr:select label="BP Account Type" fieldName="usBpAccountType" modelName="search.usBpAccountType" modelValues="bpAccountTypes" multiple="multiple" width="300" onChange="bpAccountTypeChange()" />
    </cmr:column> 


    <cmr:column>
        <cmr:select img="info-bubble-icon" title="IBM has two types of CMRs in the United States:

    1. BP@EU CMRs: Used for IBM Systems hardware and software orders using machine type/models. Also used with IBM Maintenance orders.
    2. IBM Direct Customer CMRs: Used with IBM Z ESW orders using machine type/models and also for the IBM Software Registration process with MySA using part numbers." 
    label="Customer Type " fieldName="customerClassCode" modelName="search.customerClassCode" modelValues="customerClassCodes" width="300" onChange="custClassChange()" />
    </cmr:column>
    
    <cmr:column>
      <cmr:text label="iERP Site id" fieldName="siteId" modelName="search.siteId" />
    </cmr:column>
    <cmr:column>
      <cmr:text label="Affiliate Number" fieldName="affNum" modelName="search.affNum" />
    </cmr:column>    

  </cmr:row>
  <cmr:row addBackground="true"> 
    <cmr:column span="4">     
      <cmr:button label="Clear All" onClick="clearAll()" highlight="true" bind="true" right="true"/>
      <cmr:button label="Search" id="searchButton" onClick="preExecSearch()" highlight="true" bind="true" right="true"/>
    </cmr:column>
  </cmr:row>
  <cmr:row addBackground="true">
    &nbsp;
  </cmr:row>
  <cmr:row>
    &nbsp; 
    
  </cmr:row>
     <cmr:row>
        <div id="table-cont" style="width:100%;display:none">
          <table id="findcmrresults" class="ibm-data-table ibm-grid ibm-altrows" style="width:100%" data-widget="datatable"
            data-searching="true" data-info="true" data-ordering="true" data-paging="true" data-scrollaxis="x"> 
            <thead> 
            <tr> 

              <th title="Please choose a customer number record with a green check mark if duplicate records are found. 
If no duplicate records are found, please use any customer number record in the list which matches your search.">Preferred<img class="info-bubble-icon" src="./images/info-bubble-icon.png"></th>
              <th>End User Name</th>
              <th>CMR Number</th>
              <th>Type</th>
              <th>Enterprise Number</th>
              <th>iERP Site ID</th>  
              <th>Affiliate Number</th>
<!--               <th>Address Type</th>  -->
              <th>Street Address</th>
              <th>City</th> 
              <th>State</th> 
              <th>Postal Code</th>
              <th>Landed Country</th> 
              <th>Action</th> 
            </tr>
            </thead>  
            <tbody> 
            </tbody> 
          </table>
        </div> 
     </cmr:row>   
    <cmr:row buttonRow="true">
      <cmr:column span="4"> 
        <span id="reject-btn" style="display:none">
          <cmr:button id='createCMRBtn' label="Create CMR" onClick="createRecord(true)" right="true" highlight="false"/>
        </span>
      </cmr:column>
    </cmr:row> 
    
    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="reject">
      <p>
        Are you sure the record you're looking for is not found on the list and you want to Create a new CMR?  
      </p>
      <br>
      <cmr:button id='createCMRBtn1' label="Yes, Create CMR" onClick="createRecord(false)" highlight="true" />
      <cmr:button label="No, continue searching" onClick="continueSearch('reject')" />
    </div>

    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="accept">
      <p> 
        The selected record's data will be loaded onto your current request. Proceed?
      </p>
      <br>
      <cmr:button label="Yes, import data" onClick="doSelectRecord()" highlight="true" />
      <cmr:button label="No, continue searching" onClick="continueSearch('accept')" />
    </div>

    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="noresult">
      <p>
        There were no results in the search. Do you want to Create a new CMR or continue searching?
      </p>
      <br>
      <cmr:button id='createCMRBtn2' label="Create CMR" onClick="createRecord(false)" highlight="true" />
      <cmr:button label="Continue searching" onClick="continueSearch('noresult')" />
    </div>
    
    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="cmrnotavailable">
      <p>
        This CMR is not available in this tool yet.  Please check back in a few hours. However, you can use this CMR number in orders and pricing requests.
      </p>
      <br>
      <cmr:button label="Continue searching" onClick="continueSearch('noresult')" highlight="true"/>
    </div>

    </cmr:controller>
</div> 
  </jsp:body>
</page:template>

<%} else if ("DE".equals(country)) {%>
<%--  <jsp:include page="pages/DE/findcmr_de.jsp"></jsp:include> --%>
<%} 
    
